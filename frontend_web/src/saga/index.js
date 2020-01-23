import { takeLatest, all } from "redux-saga/effects";
import { login } from "./authSaga";

export default function* rootSaga(){
	yield takeLatest("LOGIN", login)
}