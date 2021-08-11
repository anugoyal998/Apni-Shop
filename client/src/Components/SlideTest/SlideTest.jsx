import React, { useEffect } from 'react'
import MyCarouselTest from './MyCarouselTest'
import axios from 'axios'
import {GetProductsTestContext} from '../../context/GetProductsTestProvider.jsx'
import { useContext } from 'react'
import ProductInfoTestProvider from '../../context/ProductInfoTestProvider'
const SlideTest = ()=> {
    const [getProductsTest,setGetProductsTest] = useContext(GetProductsTestContext);
    const HandleApiCall = async ()=> {
        const url = 'http://localhost:5000'
        try {
            const getProducts = await axios.get(`${url}/get-products`);
            setGetProductsTest(getProducts.data);
            console.log(getProductsTest);            
        } catch (error) {
            console.log("error in get products api frontend", error);
        }
    }
    useEffect(()=>{
        HandleApiCall();
    },[])
    return(
        <>
        <ProductInfoTestProvider><MyCarouselTest getProductsTest={getProductsTest}  /></ProductInfoTestProvider>
        <ProductInfoTestProvider><MyCarouselTest getProductsTest={getProductsTest}  /></ProductInfoTestProvider>
        <ProductInfoTestProvider><MyCarouselTest getProductsTest={getProductsTest}  /></ProductInfoTestProvider>
        <ProductInfoTestProvider><MyCarouselTest getProductsTest={getProductsTest}  /></ProductInfoTestProvider>
        </>
    )
}

export default SlideTest;