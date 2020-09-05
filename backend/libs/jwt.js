const jwt = require('jsonwebtoken');
const { redisGet, redisSet } = require("../libs/cache")

exports.createJWTAndSave = async (payload) => {
	const token = jwt.sign(payload, process.env.PRI_KEY);
	await redisSet(token, payload.userId);

	return token
}

exports.createJWT = (payload) => {
	return jwt.sign(payload, process.env.PRI_KEY);
}

exports.requiredLogin = async (req, res, next) => {
	if (!req.header('x-access-token')) res.status(401).json({ success: false, message : "Please log in first" })

	/**
	 * Using Redis to Authorize
	 */
	const token = await redisGet(req.header('x-access-token'))

	if (!token) {
		return res.status(401).json({ success: false, message: "Unauthorized Access" })
	}
	
	next();
	/**
	 * Using JWT to Authorize
	 */
	// return jwt.verify(req.header('x-access-token'), process.env.PRI_KEY, (err, decoded) => {
	// 	if(err) next({success : false})
	// 	else if (decoded && decoded.email && decoded.userId) {
	// 		next()
	// 	} else {
	// 		res.status(500).json({ success : false })
	// 	}
	// })
	/**
	 * Using Redis
	 */
}

exports.isCorrectUser = (userId, tokenUserId) => {
	return jwt.verify(userId, process.env.PRI_KEY, function(err, decoded){
		if(decoded && decoded.userId == tokenUserId) return true;
		return false;
	})
}