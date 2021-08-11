import axios from 'axios'
import * as actionType from '../constants.js'

const url = "http://localhost:5000";

export const getProductInfo = (id)=> async(dispatch)=> {
    try {
        const {data} = await axios.get(`${url}/product/${id}`);
        dispatch({type: actionType.GET_PRODUCT_INFO_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: actionType.GET_PRODUCT_INFO_FAIL, payload: error.response})
    }
}