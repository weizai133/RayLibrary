const express = require('express');
const {isCorrectUser, requiredLogin} = require('../libs/jwt');
const router = express.Router();

router.use((req, res, next) => {
	let token = req.header('x-access-token');
	let authKey = req.header('authorisation-key');
	if(token && token.length>0 && authKey){
		// Check whether user logined or not
		const result = requiredLogin(token);
		if(!!result){
			if(isCorrectUser(authKey, result.userId)) next();
			else res.status(401).json({status : 401, message : 'You are not the correct user'});
		}else res.status(401).json({status:401, message : 'Login fail'});
	}else{
		res.status(401).json({status:401, message : 'Please login first'});
	}
});

module.exports = router;
