const db = require("../db");
const {getDaysBetweenRange} = require('../libs/helper');
const {logger} = require('../libs/logger');
const moment = require('moment');
const collectionApi = require("./collection");

exports.createBook = (bookName, collectionId, price, author = null) => {
	return new Promise((resolve, reject)=>{
		let sqlQuery = 'INSERT INTO book SET ?';
		db.query(sqlQuery, {bookName, collectionId, price, author}, function(err, rows){
			if(err) reject({success : false, message : 'systemError'});
			else if(rows) {
				resolve({success: true, data: {bookId: rows.insertId, bookName, price, author}});
			}
		})
	})
}

exports.createMultipleBooks = (books) => {
	return new Promise((resolve, reject) => {
		Promise.all(
			books.map(val => this.createBook(val['bookName'], val['collectionId'], val['price'], val['author']))
		)
		.then(res => resolve({success: true, data : res}))
		.catch(err => reject({success : false, message : "Something wrong in the books..."}));
	})
}

exports.searchBookById = (bookId) => {
	return new Promise((resolve, reject)=>{
		let sqlQuery = 'SELECT * FROM book where bookId = ? AND active = 1';

		db.query(sqlQuery, [bookId], function(err, rows){
			if(err) reject({success: false, message : err});
			else if(rows && rows.length>0) resolve({success : true, data : rows[0]});
			else if(rows && rows.length === 0) reject({success : false, message : 'Book does not exist'});
		})
	})
}

exports.updateBook = (bookId, data) => {
	return new Promise((resolve, reject)=>{
		let sqlQuery = 'UPDATE book SET ? ';
		sqlQuery += ` WHERE bookId = ${bookId}`;
		db.query(sqlQuery, [data], function(err, rows){
			if(err) reject({success : false, message: 'systemError'})
			else if(rows) resolve({success: true, data: {bookId,data}})
		})
	})
}

exports.getBooks = () => {
	return new Promise((resolve,reject)=>{
		let sqlQuery = 'SELECT * FROM book';
		db.query(sqlQuery, {}, function(err, rows){
			if(err) reject({success: false, message: 'systemError'});
			else if(rows && rows.length>0) resolve({success : true, data : rows})
		})
	})
}

exports.createBorrowOrder = (userId, bookId, from, to) =>{
	return new Promise((resolve, reject)=>{
		let sqlquery = 'INSERT INTO order SET ?';
		let duration = getDaysBetweenRange(from, to);
		db.query(sqlquery, {bookId, userId, from, to,duration }, async (err, rows)=>{
			if(err) reject({success : false, message: 'systemError'});
			else if (rows) {
				try {
					await this.updateBook(bookId, {borrowed : 1})
					let borrowedBook = await this.searchBookById(bookId);
					borrowedBook = borrowedBook.data;
					let coll = await collectionApi.getColletionById(borrowedBook.collectionId);
					coll = coll.data;
					await collectionApi.updateCollectionByID(borrowedBook.collectionId, {inStore : Number(coll.inStore) - 1});
					resolve({success : true, data : {borrowId : rows.insertId}});
				} catch (error) {
					console.log(error)
					reject({success : false, message : 'Fail to create borrow order'});
				}
			}
		})
	})
}

exports.getBorrowOrderById = (borrowId) => {
	return new Promise((resolve, reject)=>{
		let sqlQuery = 'SELECT * FROM order WHERE borrowId = ?';

		db.query(sqlQuery, [borrowId], function(err, rows){
			if(err) {
				console.log(err)
				reject({success : false, message : 'Fail to get borrowOrder'});
			}
			else if(rows && rows.length>0) resolve({success : true, data : rows[0]});
		})
	})
}

exports.updateBorrowOrder = (borrowId, data) => {
	return new Promise((resolve, reject)=>{
		let sqlQuery = `UPDATE order SET ? `;
		sqlQuery += `WHERE borrowId = ${borrowId}`;
		db.query(sqlQuery, [data], function(err, rows){
			if(err) {
				console.log(err)
				reject({success : false, message : 'systemError'});
			}
			else if(rows) {
				resolve({success : true, data: {borrowId, data} });
			}
		})
	})
}

exports.getAllBorrowOrderByUserId = (userId) => {
	return new Promise((resolve, reject)=>{
		let sqlQuery = `SELECT borrowId, book.bookId, bookName, userName, order.from, order.to, duration, sold, hasReturn, fine FROM `;
		sqlQuery += '((order INNER JOIN user on user.userId = order.userId AND user.userId = ? ) INNER JOIN book on book.bookId = order.bookId)';

		db.query(sqlQuery, [userId], (err, rows)=>{
			if(err) reject({success : false, message: 'systemError'});
			else if(rows && rows.length>0) {
				if(rows.find(val => val['hasReturn'] === 0 && moment(val.to).isBefore(moment()))){
					 rows = rows.map(val=> (
						moment(val.to).isBefore(moment()) ? 
						{
							...val,
							fine : 5 * getDaysBetweenRange(val['to'], moment())
						} : {...val}
					));

					Promise.all(rows.filter(val=> val.fine && val.fine>0).map((val)=> {
						return this.updateBorrowOrder(val.borrowId, {fine : val['fine']});
					}))
					.then(res=>{
						resolve({success : true, data : rows})
					})
					.catch(err=> reject({success : false, message : 'systemError'}))
				}else{
					resolve({success : true, data : rows})
				}
			}
		})
	})
}

exports.returnBook = (borrowId, returnDate, fine = null ) => {
	return new Promise(async (resolve, reject)=>{
		try {
		  let borrowOrder = await this.getBorrowOrderById(borrowId);
			borrowOrder = borrowOrder.data;
			const bookId = borrowOrder.bookId;

			await this.updateBook(bookId, {borrowed : 1})
			let book = await this.searchBookById(bookId);
			book = book.data;
			//Update book
			await this.updateBook(bookId, {borrowed : 0});
			//Update collection
			let collection = await collectionApi.getColletionById(book.collectionId);
			collection = collection.data;
			await collectionApi.updateCollectionByID(book.collectionId, {inStore : Number(collection.inStore) + 1 });

			//Update borrow order
			await this.updateBorrowOrder(borrowId, {hasReturn : 1, returnDate, fine})
			resolve({success : true, data : {borrowId, bookId : book.bookId, collectionId : collection.collectionId}});

		} catch (error) {
			console.log(error)
			reject({success : false, message : 'Fail to return book'});
		}
	})
}

exports.purchase = (bookId, orderId) => {
	return new Promise(async (resolve, reject)=>{
		try { 
			let book = await this.searchBookById(bookId);
			book = book.data;
			await this.updateBook(bookId, {orderId, sold : 1})
			let coll = await collectionApi.getColletionById(book.collectionId);
			coll = coll.data;
			await collectionApi.updateCollectionByID(book.collectionId, {inStore : Number(coll.inStore) - 1});
			resolve({success : true, data : {bookId, orderId}});
		} catch (error) {
			console.log(error);
			reject(error)
		}
	})
}

exports.purchaseBooks = (items, userId, price) =>{
	return new Promise((resolve, reject)=>{
		let sqlQuery = 'INSERT INTO purchase_order SET ';
		sqlQuery += 'userId = ? , items = ?, price = ?;';
		db.query(sqlQuery, [userId, items, price], async (err, rows)=>{
			if(err) reject({success:false, message: err});
			else if(rows) {
				logger.info('Purchasing book')
				try {
					await Promise.all(JSON.parse(items).map(val=>
						this.purchase(val, rows['insertId'])
					));
	
					resolve({success : true, data : {orderId : rows['insertId'], items, userId} });
				} catch (error) {
					reject({success : false, message : 'Fail to create purchase books'})
				}

			}
		})
	})
}

exports.checkBookAvaililty = (books) =>{
/**
 * @PARAM 'books' is array, then we can check multiple books
 */
	if(Array.isArray(books)){
		var base = 'SELECT bookId, bookName FROM book WHERE borrowed = 0 AND sold = 0 AND orderId IS NULL AND bookId =';
		var sqlQuery = books.map(val=> base + val + ';');

		const check = (query) => {
			logger.info('Checking books availablity');
			return new Promise((resolve, reject)=>{
				db.query(query, {}, function(err, rows){
					if(err) reject({data: err});
					else if(rows) {
						resolve({data: rows})
					}
				})	
			})
		}
		return Promise.all(sqlQuery.map(val=> check(val)));

	}
}
