import {createContext, useState} from 'react'

export const CartItemsContext = createContext();

const CartItemsProvider= ({children})=> {
    const [cartItems,setCartItems] = useState();
    return(
        <CartItemsContext.Provider value={[cartItems,setCartItems]}>
            {children}
        </CartItemsContext.Provider>
    )
}

export default CartItemsProvider;