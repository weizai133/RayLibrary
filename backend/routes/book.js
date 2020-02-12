const bookApi = require('../api/book');
const authRouter = require('./authRouter');
const {logger} = require('../libs/logger');

authRouter.post('/createBook', (req, res)=>{
	try {
		if(!req.body.name || !req.body.price || !req.body.collectionId) {
			throw {success : false, message : 'Invalid Input'}
		}

		bookApi.createBook(req.body.name, req.body.price, req.body.author, req.body.collectionId)
		.then(result => {
			res.status(200).json(result);
		})
	} catch (error) {
		// logger.logFail(error);
		res.status(200).json(error);
	}
})

authRouter.post('/createMultipleBooks', (req, res)=>{
	if(!req.body.books) {
		res.status(200).json({success : false, message : 'Book(s) is required'});
		return;
	}

	bookApi.createMultipleBooks(req.body.books)
	.then(result => res.status(200).json(result))
	.catch(err => res.status(200).json(err))
})

authRouter.post('/', (req, res)=>{ 
	bookApi.getBooks()
	.then(result => res.status(200).json(result))
	.catch(err=> res.status(200).json(result));
})

authRouter.post('/searchBookById/:bookId', (req, res)=>{
	if(!req.params.bookId) res.status(200).json({success : false, message : 'Need the book id!'});
	
	bookApi.searchBookById(req.params.bookId)
	.then(result => res.status(200).json(result))
	.catch(err => res.status(200).json(err));
})

authRouter.put('/updateBook/:bookId', (req, res)=>{
	if(!req.params.bookId || !req.body){
		res.status(200).json({status : 200, message : 'Not valid input'});
		return;
	}
	bookApi.updateBook(req.params.bookId, req.body)
	.then(result => res.status(200).json(result))
	.catch(err => res.status(200).json(err));
})

authRouter.post('/borrow', (req, res)=>{
	const {userId, bookId, from, to} = req.body;
	if(!userId || !bookId || !from || !to){
		res.status(200).json({success: false, message: 'Not valid input'});
		return;
	}

	bookApi.checkBookAvaililty([bookId])
	.then(result => {
		if(result.find(el=> el.data.length === 0)){
			res.status(200).json({success : false, message : "This book is not availble"});
			return;
		}

		bookApi.createBorrowOrder(userId, bookId, from, to)
		.then(result=>res.status(200).json(result))
		.catch(err=>res.status(200).json(err));
	})
	.catch(err => res.status(200).json({success : false, message : err}))
})

authRouter.post('/borrow/getBorrowBook/:userId', (req, res)=>{
	if(!req.params.userId) {
		res.status(200).json({success : false, message : 'Need user Id on param'});
		return;
	}
	bookApi.getAllBorrowOrderByUserId(req.params.userId)
	.then(result => res.status(200).json(result))
	.catch(err => res.status(200).json(err));
})

authRouter.post('/borrow/returnBook/:borrowId', (req, res)=>{
	if(!req.params.borrowId || !req.body.returnDate) {
		res.status(200).json({success: false, message : 'Invalid Input'});
		return;
	}
	bookApi.returnBook(req.params.borrowId, req.body.returnDate, req.body.fine)
	.then(result=> res.status(200).json(result))
	.catch(err=> res.status(200).json(err));
})

authRouter.post('/buyBooks', (req, res)=>{
	if(!req.body.books || !req.body.userId || !req.body.price) {
		res.status(200).json({success: false, message: 'Invalid input'});
		return;
	}
	
	bookApi.checkBookAvaililty(JSON.parse(req.body.books))
	.then(result => {
		if(result.find(el=> el.data.length === 0)){
			return {orderReady : false, data : result};
		}
		return {orderReady : true, data : result};
	})
	.then(async (result) => {
		if(result.orderReady){
			try {
				const purchaseResult = await bookApi.purchaseBooks(req.body.books, req.body.userId, req.body.price);
				res.status(200).json({succes: true, orderReady : true, data : purchaseResult});
			} catch (error) {
				console.log(error)
				res.status(200).json(error);
			}
		}else{
			res.status(200).json({success: false, orderReady : false, data : result.data})
		}
	})
	.catch(err => {
		console.log(err);
		res.status(200).json(err)
	});
})

module.exports = authRouter;
