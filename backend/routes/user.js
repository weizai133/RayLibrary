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
		res.status(200).json({status: 200, message : error})
	}
})

router.post('/getUserTypes', (req, res)=>{
	res.status(200).json(authApi.getUserTypes())
})

router.post('/signIn', (req, res)=>{
	if(!req.body.email || !req.body.password) {
		res.status(200).json('Not Valid Input');
		return;
	}
	
	authApi.signIn(req.body.email, req.body.password)
	.then(result=> res.status(200).json(result))
	.catch(err => res.status(200).json(err));

})

router.post('/emailExist', (req, res)=>{
	if(!req.body.email) {
		res.status(200).json({success: false, message : 'Email is required'});
		return;
	}

	authApi.emailExist(req.body.email)
	.then(result=>{
		res.status(200).json(result);
	})
	.catch(err=>res.status(200).json(err));
})

router.post('/logout/:id', (req, res)=>{
	authApi.logout(req.params.id)
	.then(result=>res.status(200).json(result))
	.catch(err=>res.status(200).json(err));
})

router.post('/getUsers/:type', (req, res)=>{
	if(!req.params.type) res.status(200).json({success : false, message : 'Type is required'});

	authApi.getUsersByTypes(req.params.type)
	.then(result => res.status(200).json(result))
	.catch(err => res.status(200).json(err));
});

module.exports = router;