export const GET_BOOKS = 'GET_BOOKS';
export const INIT_BOOKS = 'INIT_BOOKS';
export const SEARCH_A_BOOK = 'SEARCH_A_BOOK';
export const INIT_SEARCH_BOOK = 'INIT_SEARCH_BOOK';
export const ADD_TO_CARD =' ADD_TO_CART';
export const SET_ERROR = 'SET_ERROR';
export const ADD_BOOK = 'ADD_BOOK';
export const INIT_NEW_BOOK = 'INIT_NEW_BOOK';
export const CREATE_BOOKS = 'CREATE_BOOKS';
export const INIT_CREATE_BOOKS = 'INIT_CREATE_BOOKS';
export const CREATE_BOOKS_STATUS = 'CREATE_BOOKS_STATUS';
export const SET_LOADING = 'SET_LOADING';

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

export const addBook = (payload) => {
	//New book object
	return {type : ADD_BOOK, payload}
}

export const initNewBook = (payload) => {
	//New book object from API
	return {type : INIT_NEW_BOOK, payload}
}

export const createBooks = (payload) => {
	//New books array
	return {type : CREATE_BOOKS, payload}
}

export const initCreateBooks = (payload) => {
	//New books array from Backend
	return {type : INIT_CREATE_BOOKS, payload : payload.map(val=> val.data)}
}

export const addToCart = (payload) => {
	//Book Object
	return {type : ADD_TO_CARD, payload}
}

export const setError = (payload) => {
	//Set Error
	return {type : SET_ERROR, payload}
}

export const setLoading = (payload) => {
	// TRUE or FALSE
	return {type : SET_LOADING, payload}
}

export const setCreateBooksStatus = (payload) => {
	//'success', 'loading', 'fail'
	return {type : CREATE_BOOKS_STATUS, payload}
}

const initialState = {
	books : [],
	searchBookId : null,
	cart : [],
	searchBook : null,
	error : null,
	newBook : null,
	newBooks : [],
	loading : false,
	createBooksStatus : null
}

export default (state = initialState, action) => {
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
			return {...state, error : action.payload};
		case ADD_BOOK:
			return {...state, addBook : action.payload};
		case INIT_NEW_BOOK:
			return {...state, books : [...state.books, action.payload]};
		case CREATE_BOOKS : 
			return {...state, newBooks : action.payload};
		case INIT_CREATE_BOOKS : 
			return {...state, books : [...state.books, ...action.payload]};
		case SET_LOADING : 
			return {...state, loading : action.payload};
		case CREATE_BOOKS_STATUS : 
			return {...state, createBooksStatus : action.payload}
		default:
			return state;
	}
}