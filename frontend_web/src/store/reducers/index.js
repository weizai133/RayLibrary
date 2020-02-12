import { combineReducers } from "redux";
import { authReducer } from "../reducers/auth";
import { bookReducer } from "../reducers/book";
import { userReducer } from "../reducers/user";
import { collectionReducer } from "../reducers/collection";
export const rootReducer = combineReducers({
	auth : authReducer,
	book : bookReducer,
	user : userReducer,
	collection : collectionReducer
})