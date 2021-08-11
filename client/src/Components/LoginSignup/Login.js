import { Button, Dialog, makeStyles, Typography } from "@material-ui/core";
import { useState } from "react";
import Signup from "./Signup";
import axios from 'axios'
const useStyles = makeStyles((theme) => ({
  
}));
const style = {
    row: {
        height: "70vh",
    },
    left: {
        background: "#383838",
        color: "#fff",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    leftApniShop: {
        fontSize: "1.5rem",
        // marginTop: "9rem",
        fontWeight: "bold",
        textAlign: "center",
        margin: "0 6rem",
    },
    right: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    rightApniShop: {
        marginTop: "1rem",
        fontWeight: "bold",
        fontSize: "1.3rem",
        marginBottom: "1rem",
        textAlign: "center",
    },
    input: {
        border: "none",
        borderBottom: "2px solid #FB4248",
        padding: ".5rem",
        margin: ".7rem 0",
        outline: "none",
    },
    button: {
        background: "#FB4248",
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    hr: {
        width: "100%",
    }
    
}
const Login = ({ open, onCloseModal }) => {
  const classes = useStyles();
  const [cnt,setCnt] = useState(false);
  const openCnt = ()=> setCnt(true);
  const closeCnt = ()=> setCnt(false);
  const handleSignup = ()=> {
    //   onCloseModal();
      openCnt();
  }
  const [login,setLogin] = useState({
      username: "",
      password: "",
  });
  const handleOnChange = (e)=> {
      setLogin({...login, [e.target.name]: e.target.value});
  }
  const [error,setError] = useState("");
  const url = "http://localhost:5000"
  const handleApiCall = async ()=> {
      const data = await axios.post(`${url}/login`,login);
      console.log(data);
      
  }
  const handleLoginOnClick = ()=> {
      handleApiCall();
      onCloseModal();
  }

  return (
    <Dialog open={open} onClose={onCloseModal} className={classes.dialog}>
      <div className="container-fluid">
        <div className="row" style={style.row}>
          <div className="col-lg-5 col-md-5 col-sm-0 col-0 mx-auto" style={style.left} >
            <Typography style={style.leftApniShop}>Apni Shop</Typography>
          </div>
          <div className="col-lg-7 col-md-7 col-sm-12 col-12 mx-auto" style={style.right}>
            <Typography style={style.rightApniShop} >Welcome to Apni Shop</Typography>
            <input onChange={(e)=> handleOnChange(e)} style={style.input} type="text" name="username" placeholder="Username" />
            <input onChange={(e)=> handleOnChange(e)} style={style.input} type="text" name="password" placeholder="Password" />
            <Button style={style.button} onClick={handleLoginOnClick} >Login</Button>
            <div className="d-flex justify-content-center align-items-center mt-2">
            <hr style={style.hr}/>
            <Typography className="mx-1">Or</Typography>
            <hr style={style.hr}/>
            </div>
            <Typography className="text-center font-bold mb-1">New to Apni Shop?</Typography>
            <Button style={style.button} onClick={handleSignup}   >Sign up</Button>
            <Signup cnt={cnt} closeCnt={closeCnt} />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default Login;
