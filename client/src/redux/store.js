import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import {getProductsReducer} from './reducer/getProductsReducer.js'
import {getProductInfoReducer} from './reducer/getProductInfoReducer.js'
import {PaymentsHistoryReducer} from './reducer/PaymentsHistoryReducer'
import {getCurrUserReducer} from './reducer/currUserReducer.js'
const reducer = combineReducers({
    getProducts: getProductsReducer,
    getProductInfo: getProductInfoReducer,
    getPaymentsHistory: PaymentsHistoryReducer,
})

const middleware = [thunk]

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware)),
)

export default store;
