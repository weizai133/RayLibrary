const db = require('../db');
const bookApi = require('./book');

exports.fetchCollections = () => {
	return new Promise((resolve, reject) => {
		let sqlQuery = 'SELECT * FROM collections';

		db.query(sqlQuery, [], function(err, rows){
			console.log(rows)
			if(err) reject({success : false, message : 'Failed to get collections'});
			else if(rows) resolve({success : true, data : rows})
		})
	})
}

exports.getColletionById = (collectionId) => {
	return new Promise((resolve, reject)=>{
		let sqlQuery = 'SELECT * FROM collections where collectionId = ?';

		db.query(sqlQuery, [collectionId], function(err, rows){
			if(err) reject({success: false, message : 'Failed to get book'});
			else if(rows && rows.length>0) {
				resolve({success : true, data : rows[0]});
			}
		})
	})
}

exports.createCollection = (collectionName, price, quantity, inStore, author = null, discount = null) => {
	return new Promise((resolve, reject)=> {
		let sqlQuery = 'INSERT INTO collections set ?';
		db.query(sqlQuery, {collectionName, price, quantity, inStore, author, discount}, async (err, rows)=>{
			try {
				if(err) reject({success : false, message : err});
				else if(rows) {
					let items = [];
					for(let a = 0; a<quantity; a++){
						items[a] = {bookName : collectionName, collectionId : rows.insertId, price, author}
					}
					const res = await bookApi.createMultipleBooks(items)
					resolve({success : true, data : res});
				} 
			} catch (error) {
				reject({success : false, message : error })
			}

		})
	})
}

exports.updateCollectionByID = (collectionId, body) => {
	return new Promise((resolve, reject) => {
		let sqlQuery = 'UPDATE collections set ? ';
		sqlQuery += `where collectionId = ${collectionId}`;

		db.query(sqlQuery, {...body}, function(err, rows){
			if(err) reject({success : false, message : 'Server Error'});
			else if(rows) {
				resolve({success : true, data : {collectionId, ...body}});
			}
		})
	})
}

exports.increaseCollectionQuantityById = (collectionId, newQuantity) => {
	return new Promise((resolve, reject)=>{
		this.getColletionById(collectionId)
		.then(res => {

			const items = [];
			for(let a = 0;a<newQuantity;a++){
				items[a] = {bookName : res.data.collectionName, collectionId, price : res.data.price, author : res.data.author}
			}
			bookApi.createMultipleBooks(items)
			.then(books => {
				this.updateCollectionByID(collectionId, {quantity : (Number(res.data.quantity) + Number(newQuantity)), inStore : (Number(res.data.inStore) + Number(newQuantity))})
				.then(coll => resolve({success : true, 
															 data : {
																collectionName : res.data.collectionName, 
																quantity : (Number(res.data.quantity) + Number(newQuantity)), 
																inStore : (Number(res.data.inStore) + Number(newQuantity))}
														}))
				.catch(err => reject(err))
			})
			.catch(err => reject({success : false, message : 'Failed to updated collection'}));
		})
		.catch(err => reject(err))
	})
}