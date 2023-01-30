import {
  CONTACT_US_FAIL,
  CONTACT_US_REQUEST,
  CONTACT_US_SUCCESS,
  CLEAR_ERRORS,
} from '../constants/contactConstant';

export const contactReducer = (state = {}, action) => {
  switch (action.type) {
    case CONTACT_US_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CONTACT_US_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        success: action.payload.success,
      };

    case CONTACT_US_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
