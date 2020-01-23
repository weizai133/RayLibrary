export const LOGIN = 'LOGIN';
export const SIGNUP= 'SIGNIP';
export const INIT_USER = 'INIT_USER';
export const AUTH_ERROR = 'AUTH_ERROR';

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

export const initUser = (payload) => {
	//USER ID, TOKEN, AUTH_KEY
	return {type : INIT_USER, payload : payload.data}
}

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN:
			return {...state, ...action.payload};
		case INIT_USER:
			return {...state, ...action.payload, isLogin : true};
		case AUTH_ERROR :
			return {...initialState};
		default:
			return state;;
	}
}
