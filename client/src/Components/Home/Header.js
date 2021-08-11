import React from "react";
import { Box, makeStyles, Toolbar, Typography } from "@material-ui/core";
import clsx from 'clsx'
import {Link} from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
  header: {
    background: "#383838",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  toolbar:{
  }, 
  t1:{
      fontSize: "3rem",
      color: "white",
      fontWeight: "bold",
  }, 
  t2:{
      fontSize: "1.5rem",
      color: "white",
  },
  a:{
      background: "#fb4248", 
      color: "white",
      textDecoration: "none",
      padding: ".7rem 1rem",
      fontWeight: "bold",
      borderRadius: "2rem", 
      marginTop: ".7rem",
      transition: "all .3s ease-in-out",
      "&:hover":{
        background: "#fb555a",
        color: "white",
      }
  }, 
}));
const Header = () => {
  const classes = useStyles();
  const boxHeight = {
    height: "70vh",
  };
  return (
    <Box className={classes.header} style={boxHeight}>
      {/* <Box className={classes.toolbar}> */}
        <Typography className={classes.t1}> Apni Shop</Typography>
        <Typography className={classes.t2}>All your shopping needs ends here :)</Typography>
        <Link className={clsx(classes.a)} href="#">Start Now</Link>
      {/* </Box> */}
    </Box>
  );
};

export default Header;
