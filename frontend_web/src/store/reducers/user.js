export const FETCH_USERS = 'FETCH_USERS';
export const INIT_USERS = 'INIT_USERS';

const initial_state = {
	users : [],
	fetchUserType : ''
}

export const fetchUsers = (userType) => {
	return {type : FETCH_USERS, payload : userType}
}

export const initUsers = (data) => {
	return {type: INIT_USERS, payload : data}
}

export default (state = initial_state, action) => {
	switch (action.type) {
		case FETCH_USERS:
			return {...state, fetchUserType : action.payload};
		case INIT_USERS : 
			return {...state, users : action.payload, fetchUserType : ''};
		default:
			return {...state};
	}
}

