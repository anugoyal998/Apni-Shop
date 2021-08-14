import React, { useContext, useState, useEffect } from "react";
import {
  AppBar,
  Box,
  InputBase,
  Toolbar,
  Typography,
  makeStyles,
  ButtonGroup,
  Button
} from "@material-ui/core";
import axios from 'axios'
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import clsx from "clsx";
import { Link } from "react-router-dom";
import ReactGLogin from "../../service/ReactGLogin.jsx";
import { AccountContext } from "../../context/AccountProvider.jsx";
// import signInWithPopup from "firebase/auth";
import { auth,provider } from "../../firebase/firebase.js";
const useStyles = makeStyles((theme) => ({
  appbar: {
    background: "#383838",
  },
  shopnow: {
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  search: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "2rem",
    color: "white",
    border: "2px solid #fff",
    padding: ".1rem .5rem",
    borderRadius: "10px",
    background: "#fff",
  },
  searchInput: {
    color: "#000",
  },
  searchicon: {
    fontWeight: "bold",
  },
  displayFlex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  buttonGroup: {
    background: "#fff",
  },
  button: {
    color: "#000",
  },
  marginLeft: {
    marginLeft: "10px",
  },
  link: {
    textDecoration: "none",
    color: "#000",
  },
  userImg: {
    borderRadius: "50%",
    width: "35px",
    marginLeft: "10px",
  },
  acoountIconLink: {
    textDecoration: "none",
    color: "#fff",
  },
}));
const Navbar = () => {
  //auth using firebase
  // const [displayName,setDisplayName] = useState('');
  // const [photoURL, setPhotoURL] = useState('')
  // const [uid, setUID] = useState()
  const [cnt,setCnt] = useState(false)
  const [currUser,setCurrUser] = useState();
  const handleOnLoginClick = async  () => {
    auth.signInWithPopup(provider).
    then((res)=> {
      // console.log(res.user)
      setCurrUser(res.user);
      setCnt(true)
    }).catch((err) => {console.log(err)});
  }
  useEffect(async () =>{
    const url = 'http://localhost:5000'
    await axios.post(`${url}/signup`,currUser);
  },[cnt])
  console.log(currUser);







  const classes = useStyles();
  const [account, setAccount] = useContext(AccountContext);
  return (
    <div>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <Box className={classes.displayFlex}>
            <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
              <Typography className={classes.shopnow}>Apni Shop</Typography>
            </Link>
            <div className={classes.search}>
              <InputBase placeholder="Search" className={classes.searchInput} />
              <div>
                <SearchIcon
                  className={clsx(classes.searchInput, classes.searchicon)}
                />
              </div>
            </div>
          </Box>
          <div className={classes.displayFlex}>
            {/* {account === "" ? (
              <ReactGLogin />
            ) : (
              <Typography>{account.name}</Typography>
            )} */}
            {
              currUser && currUser.displayName?<Typography>{currUser.displayName}</Typography>:
              <ButtonGroup className={classes.buttonGroup}><Button className={classes.button} onClick={handleOnLoginClick} >Login</Button></ButtonGroup>
            }

            {
              currUser && currUser.uid?<Link to={`/cart/${currUser.uid}}`} style={{ color: "#fff", textDecoration: "none" }}>
              <ShoppingCartIcon className={clsx(classes.marginLeft)} />
            </Link>:<Link style={{ color: "#fff", textDecoration: "none" }}>
              <ShoppingCartIcon className={clsx(classes.marginLeft)} />
            </Link>
            }
            {currUser && currUser.photoURL? (
              <Link to={`/profile/${currUser.uid}`}>
              <img src={currUser.photoURL} className={classes.userImg} />
            </Link>
            ) : (
              <Link>
                <AccountCircleIcon
                  className={clsx(classes.marginLeft, classes.acoountIconLink)}
                />
              </Link>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
