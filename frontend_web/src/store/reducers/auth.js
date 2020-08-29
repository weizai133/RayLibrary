export const LOGIN = 'LOGIN';
export const SIGNUP= 'SIGNIP';
export const INIT_USER = 'INIT_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOG_OUT = 'LOG_OUT';

const initialState = {
	email : null,
	password : null,
	token : null,
	authKey : null,
	userId : null,
	isLogin : false,
	error : null
}

export const login = (payload) => {
	//EMAIL AND PASSWORD
	return {type : LOGIN, payload}
}

export const logOut = () => {
	['token', 'authKey', 'userId'].forEach(val=>window.localStorage.removeItem(val));
	return {type : LOG_OUT};
}

export const initUser = (payload) => {
	//USER ID, TOKEN, AUTH_KEY
	return {type : INIT_USER, payload : payload.data}
}

export const authError = (payload) => {
	return {type : AUTH_ERROR, payload};
}

export default (state = initialState, action) => {
	switch (action.type) {
		case LOGIN:
			return {...state, ...action.payload, error : null};
		case INIT_USER:
			return {...state, ...action.payload, isLogin : true};
		case LOG_OUT:
			return {...initialState};
		case AUTH_ERROR :
			return {...initialState, error : action.payload};
		default:
			return state;;
	}
}
