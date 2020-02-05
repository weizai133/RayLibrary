import { takeLatest, all } from "redux-saga/effects";
import { LOGIN } from "../store/reducers/auth";
import { GET_BOOKS } from "../store/reducers/book";
import { FETCH_USERS } from "../store/reducers/user";
import { login } from "./authSaga";
import { getBooks } from "./bookSaga";
import { fetchUsers } from "./userSaga";

export default function* rootSaga(){
	yield all({
		auth : all({
			login : yield takeLatest(LOGIN, login)
		}),
		book : all({
			fetchBooks : yield takeLatest(GET_BOOKS, getBooks)
		}),
		user : all({
			fetchUsers: yield takeLatest(FETCH_USERS, fetchUsers)
		})
	})
}