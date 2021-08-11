import {createContext, useState} from 'react'

export const GetProductsTestContext = createContext();

const GetProductsTestProvider = ({children})=> {
    const [getProductsTest,setGetProductsTest] = useState();
    return(
        <GetProductsTestContext.Provider value={[getProductsTest,setGetProductsTest]}>{children}</GetProductsTestContext.Provider>
    )
}

export default GetProductsTestProvider;