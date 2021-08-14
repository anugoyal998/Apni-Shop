import ActionTypes from '../constants/action-types';
import axios from 'axios'
import {auth} from '../../firebase/firebase'
export const getAllProductsAction = () => async (dispatch) => {
    try{
        const url = 'http://localhost:5000'
        const response = await axios.get(`${url}/get-products`);
        if(!response.data)
        dispatch({type: ActionTypes.GET_ALL_PRODUCTS_LOADING, payload: "Loading..."})
        else
        dispatch({type: ActionTypes.GET_ALL_PRODUCTS_SUCCESS,payload: response.data})
    }catch(err){
        dispatch({type: ActionTypes.GET_ALL_PRODUCTS_FAIL, payload: err.response})
    }
}

export const getProductInfoAction = (id)=> async (dispatch)=> {
    try{
        const url = 'http://localhost:5000'
        const response = await axios.get(`${url}/product/${id}`)
        if(!response.data)
        dispatch({type: ActionTypes.GET_PRODUCT_INFO_LOADING, payload: "Loading..."})
        else
        dispatch({type: ActionTypes.GET_PRODUCT_INFO_SUCCESS, payload: response.data})
    }catch(err){
        dispatch({type: ActionTypes.GET_PRODUCT_INFO_FAIL, payload: err.response})
    }
}

export const getCartItemsAction = (uid) => async (dispatch) => {
    try{
        const url = 'http://localhost:5000'
        const {data} = await axios.get(`${url}/get-cart-items/${uid}`)
        dispatch({type: ActionTypes.GET_CART_ITEMS_SUCCESS, payload: data})
    }catch(err){
        dispatch({type: ActionTypes.GET_CART_ITEMS_FAIL, payload: err.response})
    }
}

export const getPaymentsHistoryAction = (uid) => async (dispatch) => {
    try{
        const url = 'http://localhost:5000'
        const {data} = await axios.get(`${url}/payment-history/${uid}`)
        dispatch({type: ActionTypes.GET_PAYMENTS_HISTORY_SUCCESS, payload: data})
    }catch(err){
        dispatch({type: ActionTypes.GET_PAYMENTS_HISTORY_FAIL, payload: err.response})
    }
}