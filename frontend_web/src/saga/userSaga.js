import { put, call, select } from "redux-saga/effects";
import { fetchUsersRequest } from "../API";
import { initUsers } from "../store/reducers/user";

export function* fetchUsers(){
	const {fetchUserType} = yield select(state => state.user);

	const res = yield call(()=>fetchUsersRequest(fetchUserType));
	
	if(res.data.success) yield put(initUsers(res.data.data))
}