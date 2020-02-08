const express = require('express');
const {isCorrectUser, requiredLogin} = require('../libs/jwt');
const router = express.Router();
const db = require('../db')

router.use((req, res, next) => {
	let token = req.header('x-access-token');
	let authKey = req.header('authorisation-key');
	if(token && token.length>0 && authKey){
		// Check whether user logined or not
		const result = requiredLogin(token);
		if(!!result){
			if(isCorrectUser(authKey, result.userId)) {
				db.query("SELECT * FROM user where userId = ?", [result.userId], function(err, rows){
					if(rows && rows.length>0) {
						if(rows[0]['token'] === token) next();
						else res.status(401).json({success : false, message : 'Please Login Again'});
					}else{
						res.status(401).json({success : false, message : 'Unexpected server error'});
					}
				})
			}
			else res.status(401).json({success : false, message : 'You are not the correct user'});
		}else res.status(401).json({success : false, message : 'Login fail'});
	}else{
		res.status(401).json({sucess : false, message : 'Please login first'});
	}
});

module.exports = router;
