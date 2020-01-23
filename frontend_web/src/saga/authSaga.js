import { put, select, call } from "redux-saga/effects";
import {loginRequest} from "../API";
import { initUser } from "../store/reducers/auth";
import { setHeader } from "../API";

export function* login(){
	const {email, password} = yield select(state=>state.auth);

	try {
		const res = yield call(()=> loginRequest(email, password));
		if(res.data.success) {
			window.localStorage.setItem('token', res.data.data.token);
			window.localStorage.setItem('authKey', res.data.data.authKey);
			window.localStorage.setItem('userId', res.data.data.userId);
			setHeader(res.data.data.token, res.data.data.authKey);
			yield put(initUser(res.data));
		}
	} catch (error) {
		
	}
}