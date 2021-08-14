import ActionTypes from '../constants/action-types';

export const allProductsReducer = (state= {allProducts: []}, {type,payload}) => {
    switch(type){
        case ActionTypes.GET_ALL_PRODUCTS_LOADING:
            return {...state, allProducts: payload}
        case ActionTypes.GET_ALL_PRODUCTS_SUCCESS:
            return {...state, allProducts: payload}
        case ActionTypes.GET_ALL_PRODUCTS_FAIL:
            return {...state, allProducts: payload}
        default: return state;
    }
}

export const productInfoReducer = (state = {productInfo: []},{type,payload}) => {
    switch(type) {
        case ActionTypes.GET_PRODUCT_INFO_LOADING: 
            return {...state,productInfo: payload}
        case ActionTypes.GET_PRODUCT_INFO_SUCCESS: 
            return {...state,productInfo: payload}
        case ActionTypes.GET_PRODUCT_INFO_FAIL: 
            return {...state,productInfo: payload}
        default: return state;
    }
}

export const cartItemsReducer = (state = {cartItems: []},{type,payload}) =>{
    switch(type) {
        case ActionTypes.GET_CART_ITEMS_SUCCESS:
            return {...state,cartItems: payload}
        case ActionTypes.GET_CART_ITEMS_FAIL:
            return {...state,cartItems: payload}
        default: return state;
    }
}

export const paymentsHistoryReducer = (state = {paymentsHistory: []},{type,payload}) =>{
    switch(type) {
        case ActionTypes.GET_PAYMENTS_HISTORY_SUCCESS:
            return {...state,paymentsHistory: payload}
        case ActionTypes.GET_PAYMENTS_HISTORY_FAIL:
            return {...state,paymentsHistory: payload}
        default: return state;
    }
}