import React, { useState } from "react";
import { connect } from "react-redux";
import { getABook, fetchBooks, bookReducer } from "../store/reducers/book";
import { Input, Table, Divider, Tag } from "antd";
import "../css/App.css";

const { Search } = Input;


function PurchasePage(props) {

	const [searchValue, setSearchValue] = useState('')

	const searchBookHandler=(value)=>{
		props.searchBook(value);
		setSearchValue('');
	}

	const mapCart = () => {

	}

	return (
		<div>
			<div className="searchInput">
				<Search 
					placeholder="Input book Id"
					value={searchValue}
					onChange={(e)=>setSearchValue(e.target.value)}
					onSearch={value => searchBookHandler(value)} 
					enterButton
				/>
			</div>
		</div>
	)
}

const mapStateToProps = ({book}) => {
	return {
		searchBook : book.searchBook,
		cart : book.cart,
		error : book.error
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		searchBook : (bookId) => dispatch(getABook(bookId)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchasePage);