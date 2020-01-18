const jwt = require('jsonwebtoken');

exports.createJWT = (payload) => {
	return jwt.sign(payload, process.env.PRI_KEY);
}

exports.requiredLogin = (token) => {
	return jwt.verify(token, process.env.PRI_KEY, function(err, decoded){
		if(decoded && decoded.userId && decoded.email){
			return decoded;
		}
		return null;
	})
}

exports.isCorrectUser = (userId, tokenUserId) => {
	return jwt.verify(userId, process.env.PRI_KEY, function(err, decoded){
		if(decoded && decoded.userId == tokenUserId) return true;
		return false;
	})
}