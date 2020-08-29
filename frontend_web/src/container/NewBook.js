import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, Button } from "antd";
import { createCollection } from "../store/reducers/collection";

export default function NewBook(props){
	const { loading, createCollectionStatus } = useSelector(state  => state.collection)
	const dispatch = useDispatch()

	const [bookName, setBookName] = useState('');
	const [quantity, setQuantity] = useState(0);
	const [price, setPrice] = useState(0);
	const [inStore, setInStore] = useState();
	const [author, setAuthor] = useState('');

	useEffect(()=>{
		if(createCollectionStatus === 'success'){
			setBookName('');
			setQuantity(0);
			setInStore(0);
			setPrice(0);
			setAuthor('');
		}
	}, [createCollectionStatus]);

	const createBooksHandler = () => {
		dispatch( createCollection({collectionName : bookName, quantity, inStore, author, price }) );
	}

	return (
		<div>
			<div>Book Name</div>
			<Input placeholder="Please input book name" value={bookName} onChange={(e)=>{setBookName(e.target.value)}} />
			<div>Quantity</div>
			<Input placeholder="Please input quantity" value={quantity} onChange={(e)=>{setQuantity(e.target.value)}} />
			<div>In Store</div>
			<Input placeholder="Please input the quantity in store" value={inStore} onChange={(e)=>{setInStore(e.target.value)}} />
			<div>Price</div>
			<Input placeholder="Please input price" value={price} onChange={(e)=>{setPrice(e.target.value)}} />
			<div>Author</div>
			<Input placeholder="Please input author" value={author} onChange={(e)=>{setAuthor(e.target.value)}} />
			<Button onClick={()=>createBooksHandler()} loading={loading}>Add</Button>
		</div>
	)
}