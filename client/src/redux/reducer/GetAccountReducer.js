import * as actionType from '../constants'

export const GetAccountReducer = (state = {account: []}, action)=> {
    switch(action.type) {
        case actionType.GET_ACCOUNT_LOADING:
            return {account: "Loading"}
        case actionType.GET_ACCOUNT_SUCCESS:
            return {account: action.payload}
        case actionType.GET_ACCOUNT_FAIL:
            return {account: action.payload}
        default: return state;
    }
}