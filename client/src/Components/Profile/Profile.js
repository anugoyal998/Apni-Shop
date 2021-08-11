import { Box, Button, ButtonGroup, makeStyles, Typography, Card, CardActionArea } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../context/CurrentUserProvider";
import EmailIcon from '@material-ui/icons/Email';
import clsx  from 'clsx'
import ReactGLogout from "../../service/ReactGLogout";
import EmptyPaymentHistory from "./EmptyPaymentHistory";
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux'
import {getPaymentsHistory} from '../../redux/action/PaymentsHistoryAction'
const useStyles = makeStyles((theme) => ({
    left: {
      button: {
        width: "100%",
        background: "#FB4248",
        color: "#FFFFFF",
        margin: ".5rem 1.5rem",
        transition: "all .3s ease-in-out",
      "&:hover":{
        background: "#fb555a",
        color: "white",
      }
      }
    }
}))
const style = {
    rowWrapper:{
        background: "#f6f6f6",
    },
    row: {
        background: "#fff",
    },
    left: {
        img: {
            borderRadius: "50%",
            width: "11rem",
        },
        name:{
          fontSize: "2rem",
          fontWeight: "bold",
      },
      email: {
          fontSize: "1rem",
          fontWeight: 600,
          opacity: ".7"
      },
      button: {
        width: "100%",
        background: "#FB4248",
        color: "#FFFFFF",
        margin: ".5rem 1.5rem",
        transition: "all .3s ease-in-out",
      "&:hover":{
        background: "#fb555a",
        color: "white",
      }
      }
    },
    right: {
        
    }
}
const Profile = () => {
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);
  const {paymentHistory} = useSelector(state => state.getPaymentsHistory);
  const dispatch = useDispatch()
  useEffect(() => {
    if(currentUser)
    dispatch(getPaymentsHistory(currentUser.googleId));
  },[dispatch]);
  console.log(paymentHistory);
  const classes = useStyles();
  return (
    <div className="container-fluid">
      {currentUser !== undefined ? (
        <div className="row" style={style.rowWrapper}>
          <div className="col-lg-10 col-md-10 col-sm-12 col-12 mx-auto" style={style.row}>
            <div className="row pt-3">
              <div className="col-lg-4 col-md-4 col-sm-12 col-12 mx-auto d-flex flex-column align-items-center">
                <img src={currentUser.imageUrl} alt={currentUser.name} className="img-fluid" style={style.left.img} />
                <Typography style={style.left.name}>{currentUser.name}</Typography>
                <Typography style={style.left.email}><EmailIcon /> {currentUser.email}</Typography>
                  <a style={{width: '100%'}}><Button style={style.left.button}>My Cart</Button></a>
                  <a style={{width: '100%'}}><Button style={style.left.button}>My Orders</Button></a>
                  <a style={{width: '100%'}}><Button style={style.left.button}>My Cards</Button></a>
                  <a style={{width: '100%'}}><Button style={style.left.button}>Logout</Button></a>
                  {/* <a style={{width: '100%'}}><ReactGLogout/></a> */}
                  <a style={{width: '100%'}}><Button style={style.left.button}>Delete Account</Button></a>
              </div>
              {/* {
                paymentHistory?<div className="col-lg-8 col-md-8 col-sm-12 col-12 mx-auto">
                {
                  paymentHistory.map((e,key)=> {
                    return <MyCard e={e} key={key}/>
                  })
                }
              </div>:""
              } */}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
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


export default Profile;
