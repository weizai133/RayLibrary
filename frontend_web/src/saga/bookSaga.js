import { put, call } from "redux-saga/effects";
import { initBooks } from "../store/reducers/book";
import { fetchBooksRequest } from "../API";;

export function* getBooks(){
	const res = yield call(()=>fetchBooksRequest());

	if(res.data.success){
		yield put(initBooks(res.data.data));
	}
}

