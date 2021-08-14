import {
  CardMedia,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Box,
  Link,
  ButtonGroup,
  Button,
  makeStyles
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import {auth} from '../../firebase/firebase'
import { getCartItemsAction } from "../../reduxAnu/actions/AllActions";
import {useSelector, useDispatch} from 'react-redux'

const style = {
  containerFluid: {
    background: "#f6f6f6",
  },
  right: {
    priceDetail: {
      fontWeight: 600,
      opacity: "0.7",
    },
    totalAmount: {
      fontWeight: 700,
    },
  },
  priceSection: {
    background: "#fff",
    position: "sticky",
    height: "200px",
    borderRadius: "5px",
  },
};
const Cart = () => {
    //user
    const [uid,setUID] = useState();
    useEffect(() => {
        const data = auth.currentUser;
        if(data)
        setUID(data.uid);
    },[])
    //cart items
    const {getCartItems} = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(() => {
      if(!uid)return;
      dispatch(getCartItemsAction(uid))
    },[uid])
    console.log("getCartItems", getCartItems)
    const cart = getCartItems.cartItems;

    
    //ta
    const [ta,setTA] = useState(0)
    const [tc,setTC] = useState(0)
    const [save,setSave] = useState(0)
    const handleTA = () => {
      if(!cart)return;
      var sum1 = 0;
      var sum2 = 0;
      cart.map((e,key)=> {
        sum1 = sum1 + parseInt(e.price.mrp)
        sum2 = sum2 + parseInt(e.price.cost)
      })
      setTA(sum1);
      setTC(sum2);
      setSave(sum1-sum2)
    }
    useEffect(() => {
      handleTA();
    },[cart])
    if(uid){
  return (
    <div className="container-fluid" style={style.containerFluid}>
      <div className="row">
        <div className="col-lg-10 col-md-10 col-sm-12 col-12 mx-auto">
            <div className="row">
              {
                  uid && cart?<div className="col-lg-8 col-md-8 col-sm-12 col-12">
                  {
                      cart.map((e,key) =>{
                          return <MyCard e={e} key={key} />
                      })
                  }
              </div>:""
              }
              <div
                className="col-lg-4 col-md-4 col-sm-12 col-12 mx-auto mt-3 pt-2"
                style={style.priceSection}
              >
                <Typography style={style.right.priceDetail}>
                  PRICE DETAILS
                </Typography>
                <hr />
                <div className="d-flex flex-column">
                  <div className="d-flex justify-content-between">
                  <Typography style={style.right.totalAmount}>
                  Total Amount: 
                  </Typography>
                  <Typography> ₹ {ta}</Typography>
                  </div>
                  <div className="d-flex justify-content-between">
                  <Typography style={style.right.totalAmount}>
                  Total Cost: 
                  </Typography>
                  <Typography> ₹ {tc}</Typography>
                  </div>
                <hr />
                  <div className="d-flex justify-content-between">
                  <Typography style={{"color": "green", fontWeight: "bold"}}>
                  You will save: 
                  </Typography>
                  <Typography style={{"color": "green", fontWeight: "bold"}}> ₹ {save}</Typography>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );}
  else{
    return <div><h1 className="text-center">404 ERROR PAGE!! Login to access</h1></div>
  }
};

const MyCard = ({ e }) => {
  const style = {
    left: {
      img: {
        width: "6rem",
        height: "6rem"
      },
    },
    right: {
      tagline: {
        opacity: ".7",
      },
      shortTitle: {
        fontSize: "1.5rem",
        fontWeight: "bold",
      },
      cost: {
        fontSize: "1rem",
        fontWeight: "bold",
      },
      discount: {
        color: "green",
      },
    },
    button: {
      background: "#FB4248",
      color: "#FFFFFF",
    },
  };
  const useStyles = makeStyles((theme) =>({
    shortTitle: {
      [theme.breakpoints.down('xs')]: {
        fontSize: "1.2rem",
      }
    }
  }))
  const classes = useStyles();
  return (
    <Card className="mt-3">
      <CardActionArea>
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-3 col-4 d-flex justify-content-center my-1 align-items-center">
            {
                e && e.url?<img src={e.url} style={style.left.img} className="my-1 ms-3" />:""
            }
          </div>
          <div className="col-lg-9 col-md-9 col-sm-9 col-8 my-1">
            {
                e && e.tagline?<Typography style={style.right.tagline}>{e.tagline}</Typography>:""
            }
            {
                e && e.title && e.title.shortTitle?<Typography  className={classes.shortTitle} style={style.right.shortTitle}>
                {e.title.shortTitle}
              </Typography>:""
            }
            {
                e && e.price && e.price.cost?<Typography style={style.right.cost}>₹ {e.price.cost}</Typography>:""
            }
            {
                e && e.discount?<Typography style={style.right.discount}>{e.discount}</Typography>:""
            }
            {/* <ButtonGroup style={style.button}><Button style={style.button}>Buy Now</Button></ButtonGroup> */}
          </div>
        </div>
      </CardActionArea>
    </Card>
  );
};

export default Cart;
