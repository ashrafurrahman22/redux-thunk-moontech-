import {
  ADD_PRODUCT,
  ADD_TO_CART,
  LOAD_PRODUCT,
  PRODUCT_LOADED,
  REMOVE_FROM_CART,
  REMOVE_PRODUCT,
  SEARCH_PRODUCT,
  UPDATE_ITEM_REQUEST,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAILURE 
} from "../actionTypes/actionTypes";

export const searchProduct = (searchValue) => ({
  type: SEARCH_PRODUCT,
  payload: searchValue,
});


export const updateItemRequest = () => ({ type: UPDATE_ITEM_REQUEST });
export const updateItemSuccess = (item) => ({ type: UPDATE_ITEM_SUCCESS, payload: item });
export const updateItemFailure = (error) => ({ type: UPDATE_ITEM_FAILURE, payload: error });


export const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
};

export const loadProduct = (data) => {
  return {
    type: LOAD_PRODUCT,
    payload: data,
  }
}

export const removeProduct = (id) => {
  return {
    type: REMOVE_PRODUCT,
    payload: id,
  };
};

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};

export const removeFromCart = (product) => {
  return {
    type: REMOVE_FROM_CART,
    payload: product,
  };
};

export const loaded = (products) => {
  return {
    type: PRODUCT_LOADED,
    payload: products,
  };
};
