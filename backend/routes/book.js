const bookApi = require('../api/book');
const authRouter = require('./authRouter');
const {logger} = require('../libs/logger');

authRouter.post('/new', (req, res)=>{
	try {
		if(!req.body.name || !req.body.price) throw {status : 400}

		bookApi.createBook(req.body.name, req.body.price, req.body.author)
		.then(result => {
			res.status(200).json(result);
		})
	} catch (error) {
		logger.logFail(error);
		res.status(500).json(error);
	}
})

authRouter.post('/', (req, res)=>{ 
	bookApi.getBooks()
	.then(result => res.status(200).json(result))
	.catch(err=> res.status(400).json(result));
})

authRouter.put('/updateBook/:bookId', (req, res)=>{
	if(!req.params.bookId || !req.body){
		res.status(400).json({status : 400, message : 'Not valid input'});
		return;
	}
	bookApi.updateBook(req.params.bookId, req.body)
	.then(result => res.status(200).json(result))
	.catch(err => res.status(400).json(err));
})

authRouter.post('/borrow', (req, res)=>{
	const {userId, bookId, from, to} = req.body;
	if(!userId || !bookId || !from || !to){
		res.status(400).json({status: 400, message: 'Not valid input'});
		return;
	}
	bookApi.createBorrowOrder(userId, bookId, from, to)
	.then(result=>res.status(200).json(result))
	.catch(err=>res.status(400).json(err));
})

authRouter.post('/borrow/getBorrowBook/:userId', (req, res)=>{
	if(!req.params.userId) {
		res.status(400).json({status : 400, message : 'Need user Id on param'});
		return;
	}
	bookApi.getAllBorrowOrderByUserId(req.params.userId)
	.then(result => res.status(200).json(result))
	.catch(err => res.status(400).json(err));
})

authRouter.post('/borrow/returnBook/:borrowId', (req, res)=>{
	if(!req.params.borrowId || !req.body.returnDate) {
		res.status(400).json({status: 400, message : 'Need borrow book Id or return date'});
		return;
	}
	bookApi.returnBook(req.params.borrowId, req.body.returnDate, req.body.fine)
	.then(result=> res.status(200).json(result))
	.catch(err=> res.status(400).json(err));
})

authRouter.post('/buyBooks', (req, res)=>{
	if(!req.body.books || !req.body.userId) {
		res.status(400).json({status: 200, message: 'Invalid input'});
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
				const purchaseResult = await bookApi.purchaseBooks(req.body.books, req.body.userId)
				res.status(200).json({status: 200, orderReady : true, data : purchaseResult});
				return;
			} catch (error) {
				res.status(400).json(err);
				return;
			}
		}else{
			res.status(200).json({status: 200, orderReady : false, data : result.data})
		}
	})
	.catch(err => res.status(400).json(err));
})

module.exports = authRouter;