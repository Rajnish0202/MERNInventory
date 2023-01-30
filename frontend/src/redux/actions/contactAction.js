import axios from 'axios';
import { toast } from 'react-toastify';
import {
  CLEAR_ERRORS,
  CONTACT_US_FAIL,
  CONTACT_US_REQUEST,
  CONTACT_US_SUCCESS,
} from '../constants/contactConstant';
import { BACKEND_URL } from './userAction';

export const contactSupport = (contactData) => async (dispatch) => {
  console.log(contactData);
  try {
    dispatch({ type: CONTACT_US_REQUEST });

    const config = { headers: { 'Content-Type': 'application/json' } };

    const { data } = await axios.post(
      `${BACKEND_URL}/api/contactUs`,
      contactData,
      config
    );

    dispatch({ type: CONTACT_US_SUCCESS, payload: data });
    toast.success('Message sent successfully.');
  } catch (error) {
    dispatch({
      type: CONTACT_US_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
