const bcrypt = require("bcrypt");
const db = require("../db");
const {logger} = require('../libs/logger') ;
const jwt = require("../libs/jwt");

const emailExist = (email) => {
	return new Promise((resolve, reject)=>{
		let sqlquery = `SELECT userId, email FROM user WHERE email = "${email}"`;
		db.query(sqlquery, {}, (err, rows) => {
			if(err) {
				logger.info(err);
				reject({succss : false, message: 'systemError'});
			}
			else if(rows) resolve({success : true, isEmailExisted : rows.length>0})
			else reject(null)
		})
	})
}

const updateTokenAndAuthorisation = async (payload) => {
	/**
	 * @PARAM "payload" must contain userId
	 */
	let token = await jwt.createJWTAndSave(payload);
	let authKey = jwt.createJWT({userId : payload.userId})
	return new Promise((resolve, reject)=>{
		let sqlquery = 'UPDATE user SET ';
		sqlquery += `token = ? `;
		sqlquery += `WHERE userId = ? `;
		let data = [token, payload.userId];
		db.query(sqlquery, data, function(err, result){
			resolve({token, authKey});
		})
	})
}

const createUser = (email, password, userName, type, age) => {
	return new Promise(async (resolve, reject)=>{
		let sqlquery = "INSERT INTO user SET ?";

		const hashPw = await bcrypt.hash(password, 10);
		
		db.query(sqlquery, {email, password : hashPw, userName, age, type}, function(err, rows){
			if(err) reject({success : false, message: err});
			else if(rows && rows['insertId']) {
				updateTokenAndAuthorisation({userId : rows['insertId'], email})
				.then(result=> resolve({success : true, data : {userId: rows['insertId'], email, token : result.token, authKey : result.authKey}}))
				.catch(err => reject({success: false, message: err}))
			}
		})
	})
}

const signIn = (email, password) => {
	return new Promise((resolve, reject)=>{
		let sqlquery = `SELECT userId, email, password FROM user WHERE email="${email}";`
		db.query(sqlquery, {}, (err, rows)=>{
			if(err) reject({success: false, message : err});
			else if(rows && rows.length>0) {
				bcrypt.compare(password, rows[0].password, (error, res)=>{
					if(res) {
						updateTokenAndAuthorisation({userId: rows[0].userId, email: rows[0].email})
						.then(result=> resolve({success : true, data : {userId: rows[0].userId, email, token : result.token, authKey : result.authKey}}))
					}
					else reject({success : false, message : 'Wrong password'});
				})
			}
			else if(rows && rows.length===0) resolve({success : false, message : "User doesn't exist"});
		})
	})
}

const logout = (userId) => {
	return new Promise((resolve, reject)=>{
		let sqlquery = 'UPDATE user SET ';
		sqlquery += 'token = ? ';
		sqlquery += 'WHERE id = ?';
		db.query(sqlquery, [null, userId], function(err, rows){
			if(err) reject({success : false, message : err});
			else if(rows) resolve({success : true, logOut : true});
		})
	})
}

const getUserTypes = () => (
	{
		"ADMIN" : "admin",
		"CUSTOMER" : "customer"
	}
)

const getUsersByTypes = (type) => {
	return new Promise((resolve, reject)=>{
		let sqlquery = 'SELECT userId, email, userName FROM user';
		if(type!=='ALL') {
			if(Object.keys(getUserTypes()).find(val => val === type)) sqlquery+= ' WHERE type = ?';
			else{
				reject({success : false, message : 'Invalid Type'});
				return;
			}
		}

		db.query(sqlquery, [type], function(err, rows){
			if(err) reject({success: false, message : err});
			else if(rows) resolve({success : true, data : rows});
		})
	})
}

module.exports = {
	createUser,
	signIn,
	getUserTypes,
	emailExist,
	logout,
	getUsersByTypes
}
