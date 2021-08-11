import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from "./Components/Home/Home.js";
import { Route } from "react-router-dom";
import ProductInfo from "./Components/ProductInfo/ProductInfo";
import Navbar from "./Components/Home/Navbar";
import AccountProvider, { AccountContext } from "./context/AccountProvider";
import SlideTest from "./Components/SlideTest/SlideTest";
import GetProductsTestProvider from "./context/GetProductsTestProvider";
import ProductInfoTestProvider from "./context/ProductInfoTestProvider";
import Profile from "./Components/Profile/Profile";
import { CurrentUserContext } from "./context/CurrentUserProvider";
import { useContext } from "react";
import Cart from "./Components/Cart/Cart";
import CartItemsProvider from "./context/CartItemsProvider.jsx";
import {useEffect} from 'react'
import {getAccount} from './redux/action/GetAccountAction'
import {useSelector,useDispatch} from 'react-redux'
const App = () => {
  const {account} = useSelector(state => state.getAccount)
  const dispatch = useDispatch();
  useEffect(() => {
    getAccount();
  },[dispatch])
  console.log(account)


  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  console.log(currentUser);
  return (
    <>
      <AccountProvider>
        <Navbar />
      </AccountProvider>
      <AccountProvider>
        <Route path="/profile/:name" exact component={Profile}></Route>
      </AccountProvider>
      <Route path="/" exact>
        <Home />
        <GetProductsTestProvider>
          <SlideTest />
        </GetProductsTestProvider>
      </Route>
      <ProductInfoTestProvider>
      <Route path="/product-info/:id" exact component={ProductInfo}></Route>
      </ProductInfoTestProvider>
      <CartItemsProvider>
      <Route path="/cart/:gId" exact component={Cart} />
      </CartItemsProvider>
    </>
  );
};

export default App;
