import { takeLatest, all } from "redux-saga/effects";
import { LOGIN } from "../store/reducers/auth";
import { GET_BOOKS } from "../store/reducers/book";
import { login } from "./authSaga";
import { getBooks } from "./bookSaga";

export default function* rootSaga(){
	yield all({
		auth : all({
			login : yield takeLatest(LOGIN, login)
		}),
		book : all({
			fetchBooks : yield takeLatest(GET_BOOKS, getBooks)
		})
	})
}