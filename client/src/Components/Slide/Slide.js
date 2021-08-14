import React, {useEffect} from 'react'
import {DealsOfDay} from './DealsOfDay.js'
import { useSelector, useDispatch } from "react-redux";
import {getProducts} from '../../redux/action/getProductsAction.js'
const Slide = () => {
    const {products} = useSelector((state)=> state.getProducts);
    const dispatch = useDispatch();
    useEffect(() =>{
        dispatch(getProducts());
    }, [dispatch]);
    // console.log(products);
    return (
        <div>
            <DealsOfDay products={products} />
        </div>
    )
}

export default Slide;
