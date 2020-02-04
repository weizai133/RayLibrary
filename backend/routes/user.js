const express= require('express');
const router = express.Router();
const authApi = require("../api/auth");

router.post('/signup', async (req, res)=>{
	try {
		if(!req.body.name || !req.body.email || !req.body.password || !req.body.type) throw({status : 400, message : "Not valid input"});

		const emailResult = await authApi.emailExist(req.body.email);
		if(!emailResult.isEmailExisted){
			authApi.createUser(req.body.email, req.body.password, req.body.name, req.body.type, req.body.age)
			.then(result=> res.status(200).json(result))
			.catch(err=> res.status(200).json(err));
		}
		else{
			res.status(200).json(emailResult)
		}

	} catch (error) {
		res.json({status: 500, message : error})
	}
})

router.post('/getUserTypes', (req, res)=>{
	res.status(200).json(authApi.getUserTypes())
})

router.post('/signIn', (req, res)=>{
	if(!req.body.email || !req.body.password) {
		res.status(400).json('Not Valid Input');
		return;
	}

	authApi.signIn(req.body.email, req.body.password)
	.then(result=> res.status(200).json(result))
	.catch(err => res.status(400).json(err));

})

router.post('/emailExist', (req, res)=>{
	if(!req.body.email) {
		res.status(400).json({status: 400, message : 'Email is required'});
		return;
	}

	authApi.emailExist(req.body.email)
	.then(result=>{
		res.status(200).json(result);
	})
	.catch(err=>res.status(400).json(err));
})

router.post('/logout/:id', (req, res)=>{
	authApi.logout(req.params.id)
	.then(result=>res.status(200).json(result))
	.catch(err=>res.status(400).json(err));
})

module.exports = router;