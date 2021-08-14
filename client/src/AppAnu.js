//bootstrap
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
//components
import Header from "./CompAnu/Home/Header"
import Navbar from "./CompAnu/Home/Navbar"
import Slide from "./CompAnu/Slide/Slide"
import ProductInfo from './CompAnu/ProductInfo/ProductInfo'
import Cart from "./CompAnu/Cart/Cart";
import Profile from "./CompAnu/profile/Profile"
//react-router-dom and react
import {Route} from 'react-router-dom'
import {useState, useEffect} from 'react'
//firebase
import {auth} from './firebase/firebase'




const AppAnu = ()=> {
    //user
    const [user,setUser] = useState()
    const handleUser =  () => {
        const data = auth.currentUser
        setUser(data)
    }
    useEffect(()=>{
        handleUser()
    },[])
    console.log("User", user)

    return(
        <>
        <Navbar/>
        <Route path="/" exact>
            <Header/>
            <Slide/>
        </Route>
        <Route path="/product-info/:id" exact component={ProductInfo} />
        <Route path="/cart" exact ><Cart/></Route>
        <Route path="/profile" ><Profile user={user} /></Route>
        </>

    )
}

export default AppAnu;