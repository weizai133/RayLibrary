const jwt = require('jsonwebtoken');

exports.createJWT = (payload) => {
	return jwt.sign(payload, process.env.PRI_KEY);
}

exports.requiredLogin = (req, res, next) => {
	if (!req.header('x-access-token')) res.status(401).json({ success: false, message : "Please log in first" })

	return jwt.verify(req.header('x-access-token'), process.env.PRI_KEY, (err, decoded) => {
		if(err) next({success : false})
		else if (decoded && decoded.email && decoded.userId) {
			next()
		} else {
			res.status(500).json({ success : false })
		}
	})
}

exports.isCorrectUser = (userId, tokenUserId) => {
	return jwt.verify(userId, process.env.PRI_KEY, function(err, decoded){
		if(decoded && decoded.userId == tokenUserId) return true;
		return false;
	})
}