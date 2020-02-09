import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchBooks } from "../store/reducers/book";

function BookList(props) {
	useEffect(()=>{
		props.fetchBooks()
	}, []);

	function mapBooks(){
		return props.listOfBooks.map(val=>(
			<div key={val.bookId}>{val.bookName}</div>
		))
	}

	return (
		<div>
			{mapBooks()}	
		</div>
	)
	

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