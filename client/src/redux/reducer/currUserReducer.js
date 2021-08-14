import * as actionType from '../constants.js'

export const getCurrUserReducer = (state = {curruser: []}, action) => {
    switch(action.type) {
        case actionType.GET_CURR_USER_LOADING:
            return {currUser: action.payload}
        case actionType.GET_CURR_USER_SUCCESS:
            return {currUser: action.payload}
        case actionType.GET_CURR_USER_FAIL:
            return {currUser: action.payload}
        default: return state;
    }
}