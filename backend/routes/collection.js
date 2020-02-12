const authRouter = require('./authRouter');
const collectionApi = require('../api/collection');

authRouter.post('/fetchCollections', (req, res)=> {
	collectionApi.fetchCollections()
	.then(result => res.status(200).json(result))
	.catch(err => res.status(200).json(err));
})

authRouter.post('/createCollection', (req, res)=> {
	if(!req.body.collectionName || !req.body.price || !req.body.quantity || !req.body.inStore) {
		res.status(200).json({success : false, message : 'Invalid input'});
		return;
	}

	collectionApi.createCollection(req.body.collectionName, req.body.price, req.body.quantity, req.body.inStore,req.body.author, req.body.discount)
	.then(result => res.status(200).json(result))
	.catch(err => res.status(200).json(err));
});

authRouter.post('/getCollectionById/:collectionId', (req, res)=> {
	if(!req.params.collectionId) {res.status(200).json({success : false, message : 'Invalid input'}); return;}

	collectionApi.getColletionById(req.params.collectionId)
	.then(result => res.status(200).json(result))
	.catch(err => res.status(200).json(err));
})

authRouter.put('/updateCollectionQuantityById/:collectionId', (req, res)=> {
	if(!req.params.collectionId || !req.body.quantity){
		res.status(200).json({success : false, message : 'Invalid input'});
		return;
	}

	collectionApi.increaseCollectionQuantityById(req.params.collectionId, req.body.quantity)
	.then(result => res.status(200).json(result))
	.catch(err => res.status(200).json(err));
})

module.exports = authRouter;