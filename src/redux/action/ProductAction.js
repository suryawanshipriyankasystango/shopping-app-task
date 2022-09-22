import axios from "axios";
import { GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAIL, ADD_CART, FILTER_PRODUCTS } from "../constants/ProductConstants"

export const productAction = () => async (dispatch) => {
    try {
        dispatch({ type: GET_PRODUCTS_REQUEST })
        const response = await axios.get("https://fakestoreapi.com/products/")
        // console.log("responseresponse", response)
        const data = response.data ? response.data : []
        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
        // debugger
    } catch (error) {
        dispatch({
            type: GET_PRODUCTS_FAIL,
            payload:
                error.data && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

// =======================Add To Cart action====================

export const ADD = (item) => {
    return {
        type: "ADD_CART", // send type
        payload: item // pass data through payload
    }
}

export const DELETE = (id) => {
    return {
        type: "REMOVE_CART",
        payload: id
    } 
}
