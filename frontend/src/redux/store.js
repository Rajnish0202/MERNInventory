import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import { forgotPasswordReducer, userReducer } from './reducers/userReducer';
import { productsReducer } from './reducers/productReducer';

const reducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  forgotPassword: forgotPasswordReducer,
});

let initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
