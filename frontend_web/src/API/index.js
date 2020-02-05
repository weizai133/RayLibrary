import axios from "axios";
const BASE_URL = 'http://localhost:3001'

export const setHeader = (token, authKey) => {
	axios.defaults.headers.common['x-access-token'] = token;
	axios.defaults.headers.common['authorisation-key'] = authKey;
}

export const apiCall = (method, url, data = null) =>{
	return new Promise((resolve, reject)=>{
		axios({
			url : `${BASE_URL}${url}`,
			method, data})
		.then(res=>resolve(res))
		.catch(err=>reject(err));
	})
}

export const loginRequest = (email, password) => {
	return new Promise((resolve, reject)=>{
		apiCall('post', '/auth/signIn', {email, password})
		.then(res => resolve(res))
		.catch(err => reject(err));
	})
}

export const fetchBooksRequest = () => {
	return new Promise((resolve, reject)=>{
		apiCall('post', '/book')
		.then(res => resolve(res))
		.catch(err=> reject(err));
	})
}

export const fetchUsersRequest = (type) => {
	return new Promise((resolve, reject)=> {
		apiCall('post', `/auth/getUsers/${type}`)
		.then(res => resolve(res))
		.catch(err => reject(err));
	})
}