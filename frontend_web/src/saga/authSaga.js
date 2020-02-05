import { put, select, call } from "redux-saga/effects";
import {loginRequest} from "../API";
import { initUser, authError} from "../store/reducers/auth";
import { setHeader } from "../API";

export function* login(){
	const {email, password} = yield select(state=>state.auth);

	try {
		const res = yield call(()=> loginRequest(email, password));
		if(res.data.success) {
			['token', 'authKey', 'userId'].forEach(val=>{
				window.localStorage.setItem(val, res.data.data[val])
			});
			setHeader(res.data.data.token, res.data.data.authKey);
			yield put(initUser(res.data));
		}else {
			yield put(authError(res.data.message));
		}
	} catch (error) {
		
	}
}