import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Input, InputNumber, Button, Icon } from "antd";
import { store } from "../store";
import { createBooks, setLoading, setCreateBooksStatus } from "../store/reducers/book";

function NewBook(props){

	useEffect(()=>{
		if(props.createBooksStatus === 'success'){
			setBookName('');
			setQuantity(0);
			setPrice(0);
			setAuthor('');
		}
	}, [props.createBooksStatus]);

	const [bookName, setBookName] = useState('');
	const [quantity, setQuantity] = useState(0);
	const [price, setPrice] = useState();
	const [author, setAuthor] = useState('');

	function createBooksHandler(){
		
		store.dispatch(setLoading(true))

		let books = [];

		for(let a=0;a<Number(quantity);a++){
			books[a]={bookName, price, author};
		}

		store.dispatch(createBooks(books));
		store.dispatch(setCreateBooksStatus('loading'))
	}

	return (
		<div>
			<div>Book Name</div>
			<Input placeholder="Please input book name" value={bookName} onChange={(e)=>{setBookName(e.target.value)}} />
			<div>Quantity</div>
			<Input placeholder="Please input quantity" value={quantity} onChange={(e)=>{setQuantity(e.target.value)}} />
			<div>Price</div>
			<Input placeholder="Please input price" value={price} onChange={(e)=>{setPrice(e.target.value)}} />
			<div>Author</div>
			<Input placeholder="Please input author" value={author} onChange={(e)=>{setAuthor(e.target.value)}} />
			<Button onClick={()=>createBooksHandler()} loading={props.loading}>Add</Button>
		</div>
	)
}

const mapStateToProps = ({book}) => {
	return {
		loading : book.loading,
		createBooksStatus : book.createBooksStatus
	}
}

export default connect(mapStateToProps)(NewBook);