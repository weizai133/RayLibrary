import React, { Component } from "react";
import { connect } from "react-redux";
import { getABook, fetchBooks, bookReducer } from "../store/reducers/book";
import { Input, Table, Divider, Tag } from "antd";
import "../css/App.css";

const { Search } = Input;


class PurchasePage extends Component{

	state={
		searchValue : ''
	}

	searchBookHandler=(value)=>{
		this.props.searchBook(value);
		this.setState({searchValue : ''});
	}

	mapCart = () => {

	}

	render(){
		return (
			<div>
				<div className="searchInput">
					<Search 
						placeholder="Input book Id"
						value={this.state.searchValue}
						onChange={(e)=>this.setState({searchValue : e.target.value})}
						onSearch={value => this.searchBookHandler(value)} 
						enterButton
					/>
				</div>
			</div>
		)
	}
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