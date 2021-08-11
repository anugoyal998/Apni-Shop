import * as actionType from '../constants.js'

export const getProductsReducer = (state = {products: []}, acttion)=> {
    switch(acttion.type) {
        case actionType.GET_PRODUCTS_SUCCESS: 
        return {products: acttion.payload}
        case actionType.GET_PRODUCTS_FAIL: 
        return {error: acttion.payload}
        default: return state;
    }
}