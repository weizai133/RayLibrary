import axios from "axios";
import { store } from "../store";
import { logOut } from "../store/reducers/auth";
import { openNotification } from "../helper";
const BASE_URL = 'http://localhost:3001';
console.log("here");

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
		.catch(err=>{
			openNotification('error', "Network Error", "Please check your network.");
			store.dispatch(logOut());
			reject(err)
		});
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

export const getBookById = (bookId) => {
	return new Promise((resolve, reject)=>{
		apiCall('post', `/book/searchBookById/${bookId}`)
		.then(res => resolve(res))
		.catch(err => reject(err));
	})
}

export const createNewBook = (book) => {
	return new Promise((resolve, reject)=> {
		apiCall('post,', '/book/new', book)
		.then(res => resolve(res))
		.catch(err => reject(err));
	})
}

export const generateNewBooksRequest = (books) => {
	return new Promise((resolve, reject)=> {
		apiCall('post', '/book/createMultipleBooks', {books})
		.then(res => resolve(res))
		.catch(err => reject(err));
	})
}

export const fetchCollectionsRequest = () => {
	return new Promise((resolve, reject)=> {
		apiCall('post', '/collection/fetchCollections')
		.then(res => resolve(res))
		.catch(err => reject(err));
	})
}

export const createCollectionRequest = (newCollection) => {
	return new Promise((resolve, reject) => {
		apiCall('post', '/collection/createCollection', newCollection)
		.then(res => resolve(res))
		.catch(err => reject(err));
	})
}