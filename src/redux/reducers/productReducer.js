import {
  ADD_PRODUCT,
  ADD_TO_CART,
  LOAD_PRODUCT,
  PRODUCT_LOADED,
  REMOVE_FROM_CART,
  REMOVE_PRODUCT,
  SEARCH_PRODUCT,
  UPDATE_ITEM_FAILURE,
  UPDATE_ITEM_REQUEST,
  UPDATE_ITEM_SUCCESS,
} from "../actionTypes/actionTypes";

const initialState = {
  cart: [],
  products: [],
};

const productReducer = (state = initialState, action) => {
  const selectedProduct = state.cart.find(
    (product) => product._id === action.payload._id
  );

  switch (action.type) {

    case LOAD_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };

      case UPDATE_ITEM_REQUEST:
      return { ...state, loading: true, error: null };
      
    case UPDATE_ITEM_SUCCESS:
      return { ...state, item: action.payload, loading: false, error: null };

    case UPDATE_ITEM_FAILURE:
      return { ...state, loading: false, error: action.payload };

      case SEARCH_PRODUCT:
        if(action.payload.length) {
          const searchQuery = action.payload.toLowerCase();
          const filteredProducts = state.products.filter(product => {
            return product.model.toLowerCase().includes(searchQuery);
          });
          return {
            ...state,
            products : filteredProducts,
          };
        }

    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
      };
    case ADD_TO_CART:
      if (selectedProduct) {
        const newCart = state.cart.filter(
          (product) => product._id !== selectedProduct._id
        );

        selectedProduct.quantity = selectedProduct.quantity + 1;

        return {
          ...state,
          cart: [...newCart, selectedProduct],
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    case REMOVE_FROM_CART:
      if (selectedProduct.quantity > 1) {
        const newCart = state.cart.filter(
          (product) => product._id !== selectedProduct._id
        );
        selectedProduct.quantity = selectedProduct.quantity - 1;

        return {
          ...state,
          cart: [...newCart, selectedProduct],
        };
      }
      return {
        ...state,
        cart: state.cart.filter(
          (product) => product._id !== action.payload._id
        ),
      };

    case PRODUCT_LOADED:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
