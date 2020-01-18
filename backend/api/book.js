const db = require("../db");
const {getDaysBetweenRange} = require('../libs/helper');
const {logger} = require('../libs/logger');
const moment = require('moment');

const createBook = (bookName, price, author = null) => {
	return new Promise((resolve, reject)=>{
		let sqlQuery = 'INSERT INTO book SET ?';
		db.query(sqlQuery, {bookName, price, author}, function(err, rows){
			if(err) reject({status : 500, message : 'systemError'});
			else if(rows) {
				resolve({status: 200, data: {bookId: rows.insertId, bookName, price, author}});
			}
		})
	})
}

const updateBook = (bookId, data) => {
	return new Promise((resolve, reject)=>{
		let sqlQuery = 'UPDATE book SET ? ';
		sqlQuery += ` WHERE bookId = ${bookId}`;
		db.query(sqlQuery, [data, bookId], function(err, rows){
			if(err) reject({status : 500, message: 'systemError'})
			else if(rows) resolve({status:200, data: {bookId,data}})
		})
	})
}

const getBooks = () => {
	return new Promise((resolve,reject)=>{
		let sqlQuery = 'SELECT * FROM book';
		db.query(sqlQuery, {}, function(err, rows){
			if(err) reject({status: 500, message: 'systemError'});
			else if(rows && rows.length>0) resolve({status : 200, data : rows})
		})
	})
}

const createBorrowOrder = (userId, bookId, from, to) =>{
	return new Promise((resolve, reject)=>{
		let sqlquery = 'INSERT INTO borrow_order SET ?';
		let duration = getDaysBetweenRange(from, to);
		db.query(sqlquery, {bookId, userId, from, to,duration }, function(err, rows){
			if(err) reject({status : 500, message: 'systemError'});
			else if (rows) resolve({status : 200, data : {borrow_id : rows.insertId}});
		})
	})
}

const getAllBorrowOrderByUserId = (userId) => {
	return new Promise((resolve, reject)=>{
		let sqlQuery = `SELECT borrowId, book.bookId, bookName, userName, borrow_order.from, borrow_order.to, duration, sold, hasReturn FROM `;
		sqlQuery += '((borrow_order INNER JOIN user on user.userId = borrow_order.userId AND user.userId = ? ) INNER JOIN book on book.bookId = borrow_order.bookId)';

		db.query(sqlQuery, [userId], function(err, rows){
			if(err) reject({status : 500, message: 'systemError'});
			else if(rows && rows.length>0) {
				const expiredBorrow = rows.filter(val => moment(val.to).isBefore(moment()));
				console.log(expiredBorrow);
				resolve({status : 200, data : rows})
			}
		})
	})
}

const returnBook = (borrowId, returnDate, fine) => {
	return new Promise((resolve, reject)=>{
		let sqlQuery = 'UPDATE borrow_order SET ';
		sqlQuery += 'hasReturn = 1, ';
		sqlQuery += 'returnDay = ? ';
		sqlQuery += 'fine = ? ';
		sqlQuery += 'WHERE borrowId = ?';
		db.query(sqlQuery, [returnDate, fine, borrowId], function(err, rows){
			if(err) reject({status : 500, message : err});
			else if(rows) {
				let sqlQuery = 'UPDATE book SET borrowed = 0 WHERE bookId = ?';
				db.query(sqlQuery, [borrowId], function(err, bookRows){
					if(err) reject({status : 500, message : 'systemError'});
					else if(bookRows) resolve({status : 200, borrowId});
				})
			}
		})
	})
}

const purchase = (bookId, orderId) => {
	return new Promise((resolve, reject)=>{
		let sqlQuery = `UPDATE book SET orderId = ?, sold = 1 WHERE bookId = ?`;
		db.query(sqlQuery, [orderId, bookId], function(err, rows){
			if(err) reject({status: 500, message: 'systemError'});
			else if(rows) resolve({status : 200, data : {bookId, orderId}})
		})
	})
}

const purchaseBooks = (items, userId) =>{
	return new Promise((resolve, reject)=>{
		let sqlQuery = 'INSERT INTO purchase_order SET ';
		sqlQuery += 'userId = ? , items = ?;';
		db.query(sqlQuery, [userId, items], function(err, rows){
			if(err) reject({status:500, message: err});
			else if(rows) {
				logger.info('Purchasing book')
				Promise.all(JSON.parse(items).map(val=>{
					purchase(val, rows['insertId']);
				}))
				.then(res=>resolve({status : 200, data : {orderId : rows['insertId'], items, userId} }))
				.catch(err=>reject(err));
			}
		})
	})
}

const checkBookAvaililty = (books) =>{
/**
 * @PARAM 'books' is array, then we can check multiple books
 */
	if(Array.isArray(books)){
		var base = 'SELECT bookId, bookName FROM book WHERE borrowed = 0 AND sold = 0 AND orderId IS NULL AND bookId =';
		var sqlQuery = books.map(val=> base + val + ';');

		const check = (query) => {
			logger.info('Checking books availablity');
			return new Promise((resolve, reject)=>{
				db.query(query, {}, function(err, rows){
					if(err) reject({data: err});
					else if(rows) {
						resolve({data: rows})
					}
				})	
			})
		}
		return Promise.all(sqlQuery.map(val=> check(val)));

	}
}


module.exports = {
	createBook,
	getBooks,
	createBorrowOrder,
	getAllBorrowOrderByUserId,
	returnBook,
	updateBook,
	purchaseBooks,
	checkBookAvaililty
}