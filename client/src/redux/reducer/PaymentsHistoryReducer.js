import * as actionType from '../constants'

export const PaymentsHistoryReducer = (state = {paymentHistory: []}, action)=> {
    switch(action.type) {
        case actionType.GET_PAYMENTS_HISTORY_LOADING:
            return {paymentHistory: "Loading"}
        case actionType.GET_PAYMENTS_HISTORY_SUCCESS:
            return {paymentHistory: action.payload}
        case actionType.GET_PAYMENTS_HISTORY_FAIL:
            return {paymentHistory: action.payload}
        default: return state;
    }
}