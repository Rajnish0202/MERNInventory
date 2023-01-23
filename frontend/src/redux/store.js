import { createStore, combineReducers, applyMiddleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from './reducers/userReducer';

const reducer = combineReducers({
  user: userReducer,
});

let initialState = {};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware())
);

export default store;
