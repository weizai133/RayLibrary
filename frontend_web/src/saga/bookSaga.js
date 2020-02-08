import { put, call, select } from "redux-saga/effects";
import { initBooks, setError, addToCart, initCreateBooks, setLoading, setCreateBooksStatus } from "../store/reducers/book";
import { fetchBooksRequest, getBookById, generateNewBooksRequest } from "../API";
import { openNotification } from "../helper";

export function* getBooks(){
	const res = yield call(()=>fetchBooksRequest());

	if(res.data.success){
		yield put(initBooks(res.data.data));
	}
}

export function* searchBook(){
	const { searchBookId } = yield select(state => state.book);

	const res = yield call(()=> getBookById(searchBookId));

	if(res.data.success) {
		if(res.data.data.borrowed===1 || res.data.data.sold===1){
			openNotification('warn', "Sorry", `Book(${res.data.data.bookName}) is not available`)
			// yield put(setError(`Book(${res.data.data.bookName}) is not available`));
		}
		else{
			yield put(addToCart(res.data.data));
		}
	}else{
		yield put(setError(res.data.message));
	}
}

export function* generateNewBooks(){
	const { newBooks } = yield select(state => state.book);

	const res = yield call(()=> generateNewBooksRequest(newBooks));

	if(res.data.success) {
		openNotification('success', 'Books are created.', null)
		yield(put(initCreateBooks(res.data.data)));
		yield(put(setCreateBooksStatus('success')));
		yield(put(setLoading(false)));
	}
}