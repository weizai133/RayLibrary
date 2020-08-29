export const FETCH_COLLECTIONS = 'FETCH_COLLECTIONS';
export const INIT_COLLECTIONS = 'INIT_COLLECTIONS';
export const SET_LOADING = 'SET_LOADING';
export const CREATE_COLLECTION = 'CREATE_COLLECTION';
export const INIT_NEW_COLLECTION = 'INIT_NEW_COLLECTION';
export const SET_CREATE_COLLECTION_STATUS = 'SET_CREATE_COLLECTION_STATUS';

export const fetchCollections = () => {
	return {type: FETCH_COLLECTIONS};
}

export const initCollections = (payload) => {
	return {type : INIT_COLLECTIONS, payload}
}

export const createCollection = (payload) => {
	return {type : CREATE_COLLECTION, payload};
}

export const initNewCollection = (payload) => {
	return {type : INIT_NEW_COLLECTION, payload}
}

export const setCreateCollectionStatus = (payload) => {
	//"loading", "success", "fail", null
	return {type : SET_CREATE_COLLECTION_STATUS, payload}
}

export const setLoading = (payload) => {
	//TRUE or FALSE
	return {type : SET_LOADING, payload}
}

const initialState = {
	collections : [],
	loading : false,
	newCollection : null,
	createCollectionStatus : null
}

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_COLLECTIONS:
			return {...state};
		case INIT_COLLECTIONS : {
			return {...state, collections : action.payload}
		}
		case SET_LOADING : {
			return {...state, loading : action.payload}
		}
		case CREATE_COLLECTION : {
			return {...state, newCollection : action.payload}
		}
		case INIT_NEW_COLLECTION : {
			return {...state, collections : [...state.collection, action.payload]}
		}
		case SET_CREATE_COLLECTION_STATUS : {
			return {...state, createCollectionStatus : action.payload}
		}
		default:
			return state;
	}
}