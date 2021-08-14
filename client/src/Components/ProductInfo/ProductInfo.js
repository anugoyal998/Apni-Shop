import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, makeStyles, Button } from "@material-ui/core";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import { ProductInfoTestContext } from "../../context/ProductInfoTestProvider.jsx";
import { CurrentUserContext } from "../../context/CurrentUserProvider.jsx";
import {TAContext} from "../../context/TAProvider.jsx";
import axios from "axios";
import {auth} from '../../firebase/firebase.js'
const useStyles = makeStyles((theme) => ({
  icon: {
    color: "#000",
  },
  button: {
    color: "white",
    fontWeight: "bold",
    background: "#FB4248",
    width: "100%",
    margin: "0 .5rem",
    transition: "all .3s ease-in-out",
    "&:hover": {
      background: "#fb555a",
      color: "white",
    },
  },
}));
const ProductInfo = ({ match }) => {
  const [productInfoTest, setProductInfoTest] = useContext(
    ProductInfoTestContext
    );
  const handleApiCall = async (req, res) => {
    try {
      const url = "http://localhost:5000";
      const data = await axios.get(`${url}/product/${match.params.id}`);
      setProductInfoTest(data.data[0]);
    } catch (error) {
      console.log("error in getting product info with id", error);
    }
  };
  useEffect(() => {
    handleApiCall();
  }, []);
  const style = {
    containerFluid: {
      background: "#f6f6f6",
    },
    row: {
      background: "#fff",
    },
    img: {
      width: "18rem",
    },
    tagline: {
      opacity: ".7",
    },
    shortTitle: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    longTitle: {
      fontSize: "1.1rem",
    },
    cost: {
      fontSize: "1.7rem",
      fontWeight: "bold",
    },
    mrp: {
      fontSize: "1.2rem",
      textDecoration: "line-through",
      opacity: ".7",
    },
    discount: {
      color: "green",
      fontWeight: "bold",
    },
    availableOffers: {
      fontWeight: "bold",
      fontSize: "1.1rem",
    },
    description: {
      fontWeight: "bold",
      fontSize: "1.1rem",
    },
    buttonWrapper: {
      width: "100%",
      marginTop: "1rem",
    },
  };
  const [currUser,setCurrUser] = useState();
  useEffect(()=> {
    const user = auth.currentUser;
    if(user)setCurrUser(user);
  },[]);
  console.log(currUser);

  //add to cart
  const [addToCart,setAddToCart] = useState()
  const handleAddToCart = async ()=> {
    setAddToCart({
      // ..addToCart,
      uid: currUser.uid,
      id: productInfoTest.id,
      url: productInfoTest.url,
      detailUrl: productInfoTest.detailUrl,
      title: {
        shortTitle: productInfoTest.title.shortTitle,
        longTitle: productInfoTest.title.longTitle,
      },
      price: productInfoTest.price,
      description: productInfoTest.description,
      tagline: productInfoTest.tagline,
      cnt: 1,
    })
  }
  console.log(addToCart)





  const classes = useStyles();



  // razorapay
  const [payment,setPayment] = useState(false);
  const [orderId,setOrderId] = useState();
  const [paymentId,setPaymentId] = useState();
  const [signature,setSignature] = useState();
  const buynow = async ()=> {
    const url = 'http://localhost:5000'
    const response = await axios.post(`${url}/orders/${currUser.uid}}`, productInfoTest)
    if(response.status!==200)return;
    const options = {
      "key": "rzp_test_NrNMTNSXspRsSj",
      "amount": response.data.amount, 
      "currency": response.data.currency,
      "name": productInfoTest.title.shortTitle,
      "description": response.data.description,
      "image": productInfoTest.url,
      "order_id": response.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": function (response){
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature)
          setOrderId(response.razorpay_order_id);
          setPaymentId(response.razorpay_payment_id);
          setSignature(response.razorpay_signature);
          setPayment(true)
          alert("Payment Done Successfully");
      },
      "prefill": {
          "name": currUser.displayName,
          "email": currUser.email,
          "contact": ""
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#FB4248"
      }
  };
  const rzp1 = new  window.Razorpay(options);
  rzp1.open();
rzp1.on('payment.failed', function (response){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
});
  }





  return (
    <div className="container-fluid" style={style.containerFluid}>
      <div className="row">
        <div className="col-lg-10 col-md-12 col-sm-12 col-12 mx-auto">
          {productInfoTest !== undefined ? (
            <div className="row" style={style.row}>
              <div className="col-lg-5 col-md-5 col-sm-12 col-12 mx-auto d-flex justify-content-center align-items-center flex-column">
                {productInfoTest !== undefined ? (
                  <img
                    src={productInfoTest.url}
                    alt="image"
                    className="img-fluid"
                    style={style.img}
                  />
                ) : (
                  ""
                )}
                <Box
                  className="d-flex justify-content-between align-items-center"
                  style={style.buttonWrapper}
                >
                  <Button className={classes.button} onClick={buynow} >Buy Now</Button>
                  <Button className={classes.button} onClick={handleAddToCart}>
                    Add To Cart
                  </Button>
                </Box>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-12 col-12 mx-auto">
                {productInfoTest !== undefined ? (
                  <Typography className="mt-1" style={style.tagline}>
                    {productInfoTest.tagline}
                  </Typography>
                ) : (
                  ""
                )}
                {productInfoTest !== undefined ? (
                  <Typography style={style.shortTitle}>
                    {productInfoTest.title.shortTitle}
                  </Typography>
                ) : (
                  ""
                )}
                {productInfoTest !== undefined ? (
                  <Typography style={style.longTitle}>
                    {productInfoTest.title.longTitle}
                  </Typography>
                ) : (
                  ""
                )}
                <Box>
                  <Box className="d-flex align-items-center">
                    <Typography className="mx-1" style={style.cost}>
                      ₹ {productInfoTest.price.cost}
                    </Typography>
                    <Typography className="mx-1" style={style.mrp}>
                      {productInfoTest.price.mrp}
                    </Typography>
                  </Box>
                  <Typography style={style.discount}>
                    {productInfoTest.discount}
                  </Typography>
                </Box>
                <Box className="my-1">
                  <Typography style={style.availableOffers}>
                    Available Offers
                  </Typography>
                  <Typography>
                    <LocalOfferIcon className={classes.icon} />{" "}
                    <strong>Bank Offer</strong> 10% off on Axis Bank Credit
                    Cards, up to ₹1500. On orders of ₹5000 and above
                  </Typography>
                  <Typography>
                    <LocalOfferIcon className={classes.icon} />{" "}
                    <strong>Bank Offer</strong> Get additional ₹3000 off on HDFC
                    Debit/Credit card EMI transactions
                  </Typography>
                  <Typography>
                    <LocalOfferIcon className={classes.icon} />{" "}
                    <strong>Bank Offer</strong> 10% off on ICICI Bank Credit
                    Cards, up to ₹1500. On orders of ₹5000 and aboves
                  </Typography>
                  <Typography>
                    <LocalOfferIcon className={classes.icon} /> Get Google Home
                    mini at just ₹1499
                  </Typography>
                </Box>
                <Typography style={style.description} className="mt-1">
                  Description
                </Typography>
                <Typography>{productInfoTest.description}</Typography>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
