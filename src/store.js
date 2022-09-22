import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import { productReducer } from "./redux/reducer/ProductReducer"
import { cartReducer } from "./redux/reducer/AddCartReducer"

const rootReducer = combineReducers({
    productList: productReducer,
    cartList: cartReducer
})

const initialState = {}

const middleware = [thunk]

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;