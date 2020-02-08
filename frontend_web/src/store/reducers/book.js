export const GET_BOOKS = 'GET_BOOKS';
export const INIT_BOOKS = 'INIT_BOOKS';
export const SEARCH_A_BOOK = 'SEARCH_A_BOOK';
export const INIT_SEARCH_BOOK = 'INIT_SEARCH_BOOK';
export const ADD_TO_CARD =' ADD_TO_CART';
export const SET_ERROR = 'SET_ERROR';

export const fetchBooks = () => {
	return {type : GET_BOOKS};
}

export const getABook = (bookId) => {
	return {type : SEARCH_A_BOOK, payload : bookId}
}

export const initBooks = (payload) => {
	//BOOKS
	return {type : INIT_BOOKS, payload}
}

export const addToCart = (payload) => {
	//Book Object
	return {type : ADD_TO_CARD, payload}
}

export const setError = (payload) => {
	//Set Error
	return {type : SET_ERROR, payload}
}

const initialState = {
	books : [],
	searchBookId : null,
	cart : [],
	searchBook : null,
	error : null
}

export const bookReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_BOOKS:
			return {...state};
		case INIT_BOOKS:
			return {...state, books : action.payload};
		case SEARCH_A_BOOK:
			return {...state, searchBookId : action.payload};
		case ADD_TO_CARD: 
			return {...state, cart : [...state.cart, action.payload]};
		case INIT_SEARCH_BOOK: 
			return {...state, searchBook : action.payload};
		case SET_ERROR:
			return {...state, error : action.payload}
		default:
			return state;
	}
}