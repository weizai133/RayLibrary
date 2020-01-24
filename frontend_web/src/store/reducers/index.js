import { combineReducers } from "redux";
import { authReducer } from "../reducers/auth";
import { bookReducer } from "../reducers/book";
export const rootReducer = combineReducers({
	auth : authReducer,
	book : bookReducer
})