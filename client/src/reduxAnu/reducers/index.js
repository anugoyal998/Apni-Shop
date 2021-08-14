import {combineReducers} from 'redux'
import {allProductsReducer, cartItemsReducer, paymentsHistoryReducer, productInfoReducer} from './AllReducers'

export const reducers = combineReducers({
    getAllProducts: allProductsReducer, 
    getProductInfo: productInfoReducer,
    getCartItems: cartItemsReducer,
    getPaymentsHistory: paymentsHistoryReducer,
})