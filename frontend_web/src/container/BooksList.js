import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBooks } from "../store/reducers/book";

class BookList extends Component {
	componentDidMount(){
		this.props.fetchBooks()
	}

	mapBooks(){
		return this.props.listOfBooks.map(val=>(
			<div key={val.bookId}>{val.bookName}</div>
		))
	}

	render(){
		console.log('Here')
		return (
			<div>
				{this.mapBooks()}	
			</div>
		)
	}

}

const mapStateToProps = ({book}) => {
	return {
		listOfBooks : book.books
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchBooks : () => dispatch(fetchBooks())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList)