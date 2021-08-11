import axios from 'axios'
import * as actionType from '../constants.js'

const url = 'http://localhost:5000'

export const getPaymentsHistory = (gId)=> async (dispatch) =>{
    try {
        dispatch({type: actionType.GET_PAYMENTS_HISTORY_LOADING, payload: "Loading"})
        const {data} = await axios.get(`${url}/payment-history/${gId}`)
        dispatch({type: actionType.GET_PAYMENTS_HISTORY_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: actionType.GET_PAYMENTS_HISTORY_FAIL, payload: error.response});
    }
}