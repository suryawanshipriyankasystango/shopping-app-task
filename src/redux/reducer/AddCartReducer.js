import {ADD_CART, REMOVE_CART} from "../constants/ProductConstants"
const INIT_STATE = {
    carts: []
}

export const cartReducer = (state = INIT_STATE, action) => {
    // console.log(action.payload, 'action.payloadaction.payload', state);
    let data = [...state.carts ,action.payload]
    switch(action.type){
        case "ADD_CART" :
            return {
                 ...state,
                // carts: action.payload?.id ? data : state.carts
                 carts: data
            }

        case "REMOVE_CART":
            const removeData = state.carts.filter((product) => product.id !== action.payload);
            return {
                ...state,
                carts: removeData
            }


        default : 
        return state
    }
}