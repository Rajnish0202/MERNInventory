import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import { forgotPasswordReducer, userReducer } from './reducers/userReducer';
import {
  actionProductReducer,
  createProductReducer,
  productDetailsReducer,
  productsReducer,
} from './reducers/productReducer';
import { searchProductReducer } from './reducers/searchReducer';

const reducer = combineReducers({
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  products: productsReducer,
  product: createProductReducer,
  filter: searchProductReducer,
  productActions: actionProductReducer,
  productDetails: productDetailsReducer,
});

let initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
