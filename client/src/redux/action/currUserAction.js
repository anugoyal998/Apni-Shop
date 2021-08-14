import axios from 'axios'
import * as actionType from '../constants.js'
import {auth} from '../../firebase/firebase.js'

export const getCurrUser = ()=> async(dispatch)=> {
    try {
        dispatch({type: actionType.GET_CURR_USER_LOADING, payload: "Loading"})
        const user = auth.currentUser;
        dispatch({type: actionType.GET_CURR_USER_SUCCESS, payload: user})
    } catch (error) {
        dispatch({type: actionType.GET_CURR_USER_FAIL, payload: error.response})
    }
}