import {
  CardMedia,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Box,
  Link,
  ButtonGroup,
  Button
} from "@material-ui/core";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CartItemsContext } from "../../context/CartItemsProvider.jsx";
import {TAContext} from '../../context/TAProvider.jsx'
const Cart = ({ match }) => {
  const style = {
    containerFluid: {
      background: "#f6f6f6",
    },
    right: {
        priceDetail: {
            fontWeight: 600,
            opacity: "0.7"
        },
        totalAmount:{
            fontWeight: 700,
        }
    },
    priceSection: {
      background: "#fff",
      position: "sticky",
      height: "200px",
      borderRadius: "5px"
    }
  };
  const [cartItems, setCartItems] = useContext(CartItemsContext);
  const [ta,setTA] = useContext(TAContext);
  const handleApiCall = async () => {
    try {
      const url = "http://localhost:5000";
      const { data } = await axios.get(
        `${url}/get-cart-items/${match.params.gId}`
      );
      setCartItems(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleApiCall();
  }, []);
  console.log(ta);

  return (
    <div className="container-fluid" style={style.containerFluid}>
      <div className="row">
        <div className="col-lg-10 col-md-10 col-sm-12 col-12 mx-auto">
          {cartItems ? (
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-12 col-12">
                {cartItems.map((e, key) => {
                  return <MyCard e={e} key={key} />;
                })}
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12 mx-auto mt-3 pt-2" style={style.priceSection}>
                <Typography style={style.right.priceDetail}>PRICE DETAILS</Typography>
                <hr />
                <Typography style={style.right.totalAmount}>Total Amount {ta} </Typography>
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

export const MyCard = ({ e, key }) => {
  const style = {
    left: {
      img: {
        width: "6rem",
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
    }
  };
  return (
    <Card className="mt-3">
      <CardActionArea>
        <div className="row">
          <div className="col-3 d-flex justify-content-center my-1">
            <img src={e.url} style={style.left.img} />
          </div>
          <div className="col-9 my-1">
            <Typography style={style.right.tagline}>{e.tagline}</Typography>
            <Typography style={style.right.shortTitle}>{e.title.shortTitle}</Typography>
            <Typography style={style.right.cost}>₹ {e.price.cost}</Typography>
            <Typography style={style.right.discount}>{e.discount}</Typography>
            <ButtonGroup style={style.button}><Button style={style.button}>Buy Now</Button></ButtonGroup>
          </div>
        </div>
      </CardActionArea>
    </Card>
  );
};

export default Cart;
