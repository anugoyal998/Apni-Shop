import {
  AppBar,
  Box,
  InputBase,
  Toolbar,
  Typography,
  makeStyles,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, provider } from "../../firebase/firebase.js";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getCurrUser } from "../../redux/action/currUserAction.js";
import { useWindowSize } from "../../util/WindowResize";
const useStyles = makeStyles((theme) => ({
  appbar: {
    background: "#383838",
  },
  shopnow: {
    fontWeight: "bold",
    fontSize: "1.2rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.1rem",
    },
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
    [theme.breakpoints.down("sm")]: {
      marginLeft: ".5rem",
    },
    [theme.breakpoints.down("xs")]: {
      width: "50%",
    },
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
    [theme.breakpoints.down("xs")]: {
      justifyContent: "start",
    },
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
  //firebase login
  const [cnt, setCnt] = useState(false);
  const handleOnLoginClick = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => {
        setCnt(true);
        handleUserInfoToDB(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //saving user info to db
  const handleUserInfoToDB = async (res) => {
    const signupURL = "http://localhost:5000";
    await axios.post(`${signupURL}/signup`, res.user);
  };
  //current user
  const [user, setUser] = useState();
  const handleUser = () => {
    const data = auth.currentUser;
    setUser(data);
  };
  useEffect(() => {
    handleUser();
  }, [cnt]);
  console.log("user", user);
  const classes = useStyles();
  const widthUtil = useWindowSize();
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
          {widthUtil && widthUtil > 768 ? (
            <div className={classes.displayFlex}>
              {user && user.displayName ? (
                <Typography>{user.displayName}</Typography>
              ) : (
                <ButtonGroup className={classes.buttonGroup}>
                  <Button
                    className={classes.button}
                    onClick={handleOnLoginClick}
                  >
                    Login
                  </Button>
                </ButtonGroup>
              )}
              {user ? (
                <Link
                  style={{ color: "#fff", textDecoration: "none" }}
                  to="/cart"
                >
                  <ShoppingCartIcon className={clsx(classes.marginLeft)} />
                </Link>
              ) : (
                <Link style={{ color: "#fff", textDecoration: "none" }}>
                  <ShoppingCartIcon className={clsx(classes.marginLeft)} />
                </Link>
              )}
              {user && user.photoURL ? (
                <Link to="/profile">
                  <img src={user.photoURL} className={classes.userImg} />
                </Link>
              ) : (
                <Link>
                  <AccountCircleIcon
                    className={clsx(
                      classes.marginLeft,
                      classes.acoountIconLink
                    )}
                    onClick={handleOnLoginClick}
                  />
                </Link>
              )}
            </div>
          ) : (
            <div className={classes.displayFlex}>
              {user && user.photoURL ? (
                <Link to="/profile">
                  <img src={user.photoURL} className={classes.userImg} />
                </Link>
              ) : (
                <Link>
                  <AccountCircleIcon
                    className={clsx(
                      classes.marginLeft,
                      classes.acoountIconLink
                    )}
                    onClick={handleOnLoginClick}
                  />
                </Link>
              )}
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
