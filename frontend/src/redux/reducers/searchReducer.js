import { SEARCH_REQUEST } from '../constants/searchConstant';

export const searchProductReducer = (
  state = { filteredProducts: [] },
  action
) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      const { products, search } = action.payload;
      const tempProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredProducts = tempProducts;
      return {
        ...state,
        filteredProducts: tempProducts,
      };

    default:
      return state;
  }
};
