import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import {
  forgotPasswordReducer,
  userReducer,
  userUpdateReducer,
} from './reducers/userReducer';
import {
  actionProductReducer,
  createProductReducer,
  productDetailsReducer,
  productsReducer,
} from './reducers/productReducer';
import { searchProductReducer } from './reducers/searchReducer';
import { contactReducer } from './reducers/contactReducer';

const reducer = combineReducers({
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  products: productsReducer,
  product: createProductReducer,
  filter: searchProductReducer,
  productActions: actionProductReducer,
  productDetails: productDetailsReducer,
  userUpdate: userUpdateReducer,
  contact: contactReducer,
});

let initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
