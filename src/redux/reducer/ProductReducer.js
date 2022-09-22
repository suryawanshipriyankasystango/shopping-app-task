import {GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAIL} from "../constants/ProductConstants"

export const productReducer = (state={ products: [] }, action) => {

    switch (action.type) {
        case GET_PRODUCTS_REQUEST:
          return { loading: true, products: [] };
    
        case GET_PRODUCTS_SUCCESS:
          // debugger
          console.log(action.payload);
          return { loading: false, products: action.payload };
    
        case GET_PRODUCTS_FAIL:
          return { loading: false, error: action.payload };
    
        default:
          return state;
      }

}