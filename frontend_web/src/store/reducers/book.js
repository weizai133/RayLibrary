export const GET_BOOKS = 'GET_BOOKS';
export const INIT_BOOKS = 'INIT_BOOKS';

export const fetchBooks = () => {
	return {type : GET_BOOKS};
}

export const initBooks = (payload) => {
	//BOOKS
	return {type : INIT_BOOKS, payload}
}

const initialState = {
	books : []
}

export const bookReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_BOOKS:
			return {...state};
		case INIT_BOOKS:
			return {...state, books : action.payload}
		default:
			return state;
	}
}