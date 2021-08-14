import React, { useEffect, useState } from "react";
import { Box, Typography, makeStyles, Button } from "@material-ui/core";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import axios from "axios";
import { auth } from "../../firebase/firebase";
import { useSelector, useDispatch} from "react-redux";
import { getProductInfoAction } from "../../reduxAnu/actions/AllActions";
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
    [theme.breakpoints.down('sm')]: {
      margin: "0 .3rem",
    },
    [theme.breakpoints.down('xs')]: {
      margin: "0 .1rem",
    }
  },
}));
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
const ProductInfo = ({ match }) => {
  //productInfo
  const {getProductInfo} = useSelector(state=> state)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProductInfoAction(match.params.id))
  },[dispatch])
  const product = getProductInfo.productInfo[0];
  // current user
  const [user,setUser] = useState();
  const handleUser =  () => {
    const data = auth.currentUser;
    setUser(data);
  }
  useEffect(()=> {
    handleUser();
  })

  //razorpay
  const [payment,setPayment] = useState(false);
  const [orderId,setOrderId] = useState();
  const [paymentId,setPaymentId] = useState();
  const [signature,setSignature] = useState();
  const buynow = async () =>{
    if(!user)return;
    const url = 'http://localhost:5000'
    const response = await axios.post(`${url}/orders/${user.uid}`, product)
    if(response.status!=200)return;
    const options = {
      "key": "rzp_test_NrNMTNSXspRsSj",
      "amount": response.data.amount, 
      "currency": response.data.currency,
      "name": product.title.shortTitle,
      "description": response.data.description,
      "image": product.url,
      "order_id": response.data.id,
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
          "name": user.displayName,
          "email": user.email,
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

  //add to cart
  const handleAddToCart = async ()=> {
    if(!user)return;
    try {
      const url = 'http://localhost:5000'
      await axios.post(`${url}/add-to-cart/${user.uid}`, product)
      alert("Added to cart successfully")
    } catch (error) {
      console.log("error in addToCart frontend",error)
    }
  }



  const classes = useStyles();
  return (
    <div className="container-fluid" style={style.containerFluid}>
      <div className="row">
        <div className="col-lg-10 col-md-12 col-sm-12 col-12 mx-auto">
          <div className="row" style={style.row}>
            <div className="col-lg-5 col-md-5 col-sm-12 col-12 mx-auto d-flex justify-content-center align-items-center flex-column">
              {product && product.url?<img
                  src={product.url}
                alt="image"
                className="img-fluid"
                style={style.img}
              />:""}
              <Box
                className="d-flex justify-content-between align-items-center"
                style={style.buttonWrapper}
              >
                <Button className={classes.button} onClick={buynow} >Buy Now</Button>
                <Button className={classes.button} onClick={handleAddToCart} >Add To Cart</Button>
              </Box>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-12 col-12 mx-auto">
              {
                product && product.tagline?<Typography className="mt-1" style={style.tagline}>
                {product.tagline}
              </Typography>:""
              }
              {
                product && product.title && product.title.shortTitle?
                <Typography style={style.shortTitle}>
                {product.title.shortTitle}
              </Typography>:""
              }
              {
                product && product.title && product.title.longTitle?
                <Typography style={style.longTitle}>
                {product.title.longTitle}
              </Typography>:""
              }
              <Box>
                <Box className="d-flex align-items-center">
                  {
                    product && product.price && product.price.cost?
                    <Typography className="mx-1" style={style.cost}>
                    ₹ {product.price.cost}
                  </Typography>:""
                  }
                  {
                     product && product.price && product.price.mrp?
                     <Typography className="mx-1" style={style.mrp}>
                    {product.price.mrp}
                  </Typography>:""
                  }
                </Box>
                {
                  product && product.discount?
                  <Typography style={style.discount}>
                  {product.discount}
                </Typography>:""
                }
              </Box>
              <Box className="my-1">
                <Typography style={style.availableOffers}>
                  Available Offers
                </Typography>
                <Typography>
                  <LocalOfferIcon className={classes.icon} />{" "}
                  <strong>Bank Offer</strong> 10% off on Axis Bank Credit Cards,
                  up to ₹1500. On orders of ₹5000 and above
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
              {
                product && product.description?<Typography>{product.description}</Typography>:""
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ProductInfo;