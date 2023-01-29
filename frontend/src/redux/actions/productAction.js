import axios from 'axios';
import { toast } from 'react-toastify';
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  CLEAR_ERRORS,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from '../constants/productConstant';
import { BACKEND_URL } from './userAction';

export const getAllProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });
    const { data } = await axios.get(`${BACKEND_URL}/api/products`);

    dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_PRODUCT_FAIL, payload: error.response.data.message });
  }
};

export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    const config = {
      headers: { 'Cntent-Type': 'multiform/form-data' },
    };

    const { data } = await axios.post(
      `${BACKEND_URL}/api/products`,
      productData,
      config
    );

    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
    toast.success('New Product added successfully.');
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: error.respone.data.message,
    });
    toast.error(error.respone.data.message);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    const { data } = await axios.delete(`${BACKEND_URL}/api/products/${id}`);
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data.success });
    toast.success(data.message);
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAIL, payload: error.respone.data.error });
  }
};

export const productDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`${BACKEND_URL}/api/products/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.respone.data.error });
  }
};

export const productUpdate = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

    const config = {
      headers: { 'Cntent-Type': 'multiform/form-data' },
    };

    const { data } = await axios.patch(
      `${BACKEND_URL}/api/products/${id}`,
      productData,
      config
    );

    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data.success });
    toast.success('Product Updated Successfully.');
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
