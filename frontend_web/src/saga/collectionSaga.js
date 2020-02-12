import { call, select, put } from "redux-saga/effects";
import { openNotification } from "../helper";
import { fetchCollectionsRequest, createCollectionRequest } from "../API";
import { initCollections, setLoading, initNewCollection, setCreateCollectionStatus  } from "../store/reducers/collection";

export function* fetchCollections() {
	yield put(setLoading(true));
	const res = yield call(()=>fetchCollectionsRequest());

	if(res.data.success){
		yield put(initCollections(res.data.data));
		yield put(setLoading(false));
	}
}

export function* createCollection () {
	const {newCollection} = yield select(state => state.collection);
	yield put(setCreateCollectionStatus('loading'));
	yield put(setLoading(true));

	const res = yield call(()=> createCollectionRequest(newCollection));

	if(res.data.success){
		openNotification('success', "New books are created.");
		yield put(setCreateCollectionStatus('success'));
		yield put(setLoading(false));
		yield put(initNewCollection(res.data.data));
	}else {
		openNotification('error', res.data.message);
		yield put(setCreateCollectionStatus('fail'));
		yield put(setLoading(false));
	}
}
