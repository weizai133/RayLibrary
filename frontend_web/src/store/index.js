import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import AuthReducer from "./reducers/auth";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga";

// Define the Reducers that will always be present in the application
const staticReducers = {
  auth: AuthReducer
};

function createReducer(asyncReducers) {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers
  })
};

const sagaMiddleware = createSagaMiddleware();

const middleware = compose(
  applyMiddleware(sagaMiddleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Configure the store
const store = createStore(createReducer(), middleware)

sagaMiddleware.run(rootSaga)

// // Add a dictionary to keep track of the registered async reducers
store.asyncReducers = {}

// Create an inject reducer function
// This function adds the async reducer, and creates a new combined reducer
store.injectReducer = (key, asyncReducer) => {
  store.asyncReducers[key] = asyncReducer
  store.replaceReducer(createReducer(store.asyncReducers))
}

// Return the modified store
export default store
