import {createContext, useState} from 'react'

export const ProductInfoTestContext = createContext();

const ProductInfoTestProvider = ({children})=> {
    const [productInfoTest,setProductInfoTest] = useState();
    return(
        <ProductInfoTestContext.Provider value={[productInfoTest,setProductInfoTest]}>
            {children}
        </ProductInfoTestContext.Provider>
    )
}

export default ProductInfoTestProvider;