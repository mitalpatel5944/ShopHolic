import {ADD_TO_CART, REMOVE_FROM_CART, PRODUCTLIST, LOGIN} from './ActionType';

const initialState = {
  productList: [],
  cartList: [],
  isLogin: '',
};

const cartItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {...state, cartList: action.payload};
    case PRODUCTLIST:
      return {...state, productList: action.payload};
    case REMOVE_FROM_CART:
      return state.filter((cartItem) => cartItem.id !== action.payload.id);
    case LOGIN:
      return {...state, isLogin: action.payload};
  }
  return state;
};

export default cartItemsReducer;
