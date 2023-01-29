import { SEARCH_REQUEST } from '../constants/searchConstant';

export const searchFilter = (products, search) => (dispatch) => {
  dispatch({ type: SEARCH_REQUEST, payload: { products, search } });
};
