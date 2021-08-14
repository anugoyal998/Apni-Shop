import {
  Box,
  Button,
  ButtonGroup,
  makeStyles,
  Typography,
  Card,
  CardActionArea,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import EmailIcon from "@material-ui/icons/Email";
import { auth } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getPaymentsHistoryAction } from "../../reduxAnu/actions/AllActions";
const useStyles = makeStyles((theme) => ({
  left: {
    button: {
      width: "100%",
      background: "#FB4248",
      color: "#FFFFFF",
      margin: ".5rem 1.5rem",
      transition: "all .3s ease-in-out",
      "&:hover": {
        background: "#fb555a",
        color: "white",
      },
    },
  },
}));
const style = {
  rowWrapper: {
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
    name: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    email: {
      fontSize: ".8rem",
      fontWeight: 600,
      opacity: ".7",
    },
    button: {
      width: "100%",
      background: "#FB4248",
      color: "#FFFFFF",
      margin: ".5rem 1.5rem",
      transition: "all .3s ease-in-out",
      "&:hover": {
        background: "#fb555a",
        color: "white",
      },
    },
  },
  link: {
    textDecoration: "none",
  },
  right: {
    heading: {
      fontSize: "1.2rem",
      fontWeight: "bold",
    },
  },
};
const Profile = () => {
  //user
  // const [uid, setUID] = useState();
  const [user, setUser] = useState();
  const [uid, setUID] = useState();
  const handleUser = () => {
    const data = auth.currentUser;
    if (data) setUser(data);
    if (data) setUID(data.uid);
  };
  useEffect(() => {
    handleUser();
  }, []);
  //payment
  const { getPaymentsHistory } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!uid) return;
    dispatch(getPaymentsHistoryAction(uid));
  }, [uid]);
  const payment = getPaymentsHistory.paymentsHistory;

  //signout
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("signout successful");
      })
      .catch((error) => {
        console.log("error in handleSignout", error);
      });
  };
  if (user) {
    return (
      <div className="container-fluid">
        <div className="row" style={style.rowWrapper}>
          <div
            className="col-lg-10 col-md-12 col-sm-12 col-12 mx-auto"
            style={style.row}
          >
            <div className="row pt-3">
              <div className="col-lg-4 col-md-4 col-sm-12 col-12 mx-auto d-flex flex-column align-items-center justify-content-center container-fluid p-0">
                {user && user.photoURL && user.displayName ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="img-fluid"
                    style={style.left.img}
                  />
                ) : (
                  ""
                )}
                {user && user.displayName ? (
                  <Typography style={style.left.name}>
                    {user.displayName}
                  </Typography>
                ) : (
                  ""
                )}
                {user && user.email ? (
                  <Typography style={style.left.email}>
                    <EmailIcon /> {user.email}
                  </Typography>
                ) : (
                  ""
                )}
                <Link
                  style={{ width: "100%", textDecoration: "none" }}
                  to="/cart"
                >
                  <Button style={style.left.button}>My Cart</Button>
                </Link>
                <Link style={{ width: "100%", textDecoration: "none" }}>
                  <Button style={style.left.button}>My Cards</Button>
                </Link>
                <Link style={{ width: "100%", textDecoration: "none" }}>
                  <Button style={style.left.button}>Logout</Button>
                </Link>
                <Link style={{ width: "100%", textDecoration: "none" }}>
                  <Button style={style.left.button}>Delete Account</Button>
                </Link>
              </div>

              <div className="col-lg-7 col-md-7 col-sm-12 col-12 mx-auto">
                {payment && payment.length ? (
                  <Typography
                    className="text-center"
                    style={style.right.heading}
                  >
                    Order History
                  </Typography>
                ) : (
                  <Typography
                    className="text-center"
                    style={style.right.heading}
                  >
                    Order History is Empty
                  </Typography>
                )}

                {payment &&
                  payment.map((e, key) => {
                    return <MyCard e={e} key={key} />;
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="text-center">404 PAGE ERROR!! Login to access</h1>
      </div>
    );
  }
};

export const MyCard = ({ e, key }) => {
  const style = {
    left: {
      img: {
        width: "9rem",
        height: "9rem",
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
  var dnt = "";
  if (e && e.date_and_time) {
    var idx = e.date_and_time.search("G");
    dnt = e.date_and_time.substr(0, idx);
  }
  return (
    <Card className="mt-3 px-2">
      <CardActionArea>
        <div className="row">
          <div className="col-lg-4 col-md-3 d-flex justify-content-center my-1 align-items-center">
            {e && e.url ? <img src={e.url} style={style.left.img} /> : ""}
          </div>
          <div className="col-lg-8 col-md-9 my-1">
            {e && e.tagline ? (
              <Typography style={style.right.tagline}>{e.tagline}</Typography>
            ) : (
              ""
            )}
            {e && e.title && e.title.shortTitle ? (
              <Typography style={style.right.shortTitle}>
                {e.title.shortTitle}
              </Typography>
            ) : (
              ""
            )}
            {e && e.price && e.price.cost ? (
              <Typography style={style.right.cost}>₹ {e.price.cost}</Typography>
            ) : (
              ""
            )}
            {e && e.discount ? (
              <Typography style={style.right.discount}>{e.discount}</Typography>
            ) : (
              ""
            )}
            {e && e.razorpay_order_id ? (
              <Typography>
                <strong>Order ID:</strong> {e.razorpay_order_id}
              </Typography>
            ) : (
              ""
            )}
            {e && e.date_and_time ? (
              <Typography>
                <strong>Bought on:</strong> {dnt}
              </Typography>
            ) : (
              ""
            )}
          </div>
        </div>
      </CardActionArea>
    </Card>
  );
};

export default Profile;
