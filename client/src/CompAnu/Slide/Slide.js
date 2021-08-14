import { useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import { getAllProductsAction } from "../../reduxAnu/actions/AllActions"
import DealsOfDay from "./DealsOfDay"


const Slide = ()=> {
    const {getAllProducts} = useSelector(state=> state)
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(getAllProductsAction())
    },[dispatch])
    console.log(getAllProducts)
    return(
        <>
        <DealsOfDay  products={getAllProducts.allProducts}/>
        </>
    )
}

export default Slide