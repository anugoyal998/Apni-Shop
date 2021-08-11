import { Button, Dialog, makeStyles, Typography } from "@material-ui/core";
import { useState } from "react";
import Login from "./Login";

const style = {
  row: {
    height: "100vh",
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
  },
};
const Signup = (props) => {
    const [open,setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const handleOnClick = ()=> {
        props.closeCnt();
    }
  return (
    <Dialog open={props.cnt} onClose={props.closeCnt}>
      '
      <div className="container-fluid">
        <div className="row" style={style.row}>
          <div
            className="col-lg-5 col-md-5 col-sm-0 col-0 mx-auto"
            style={style.left}
          >
            <Typography style={style.leftApniShop}>Apni Shop</Typography>
          </div>
          <div
            className="col-lg-7 col-md-7 col-sm-12 col-12 mx-auto"
            style={style.right}
          >
            <Typography style={style.rightApniShop}>
              Welcome to Apni Shop
            </Typography>
            <input
              style={style.input}
              type="text"
              name="name"
              placeholder="Name"
            />
            <input
              style={style.input}
              type="text"
              name="username"
              placeholder="username"
            />
            <input
              style={style.input}
              type="text"
              name="email"
              placeholder="Email"
            />
            <input
              style={style.input}
              type="text"
              name="mobile"
              placeholder="Mobile"
            />
            <input
              style={style.input}
              type="text"
              name="password"
              placeholder="Password"
            />
            <input
              style={style.input}
              type="text"
              name="confirmPassword"
              placeholder="Confirm Password"
            />
            <Button style={style.button} onClick={props.closeCnt} >
              Signup
            </Button>
            <div className="d-flex justify-content-center align-items-center mt-2">
              <hr style={style.hr} />
              <Typography className="mx-1">Or</Typography>
              <hr style={style.hr} />
            </div>
            <Typography className="text-center font-bold mb-1">
              Already have an account?
            </Typography>
            <Button style={style.button} onClick={handleOnClick} >
              Login
            </Button>
            <Login open={open} onCloseModal={onCloseModal}  />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default Signup;
