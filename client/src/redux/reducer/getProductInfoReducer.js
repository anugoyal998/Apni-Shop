import * as actionType from '../constants.js'


export const getProductInfoReducer = (state = {product: []}, action) => {
    switch(action.type) {
        case actionType.GET_PRODUCT_INFO_SUCCESS:
            return {product: action.payload}
        case actionType.GET_PRODUCT_INFO_FAIL:
            return {product: action.payload}
        default: return state;
    }
}