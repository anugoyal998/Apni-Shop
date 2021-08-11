import GoogleLogin from "react-google-login";
import {useContext, useEffect} from "react"
import {AccountContext} from '../context/AccountProvider.jsx'
import axios from 'axios'
import { CurrentUserContext } from "../context/CurrentUserProvider.jsx";
const ReactGLogin = () => {
  const cid =
    "900254160655-h7gk2jaqt75gaj8qki7prt25ilpuola6.apps.googleusercontent.com";
    const [account,setAccount] = useContext(AccountContext);
    const [currentUser,setCurrentUser] = useContext(CurrentUserContext);
  const onLoginSuccess = async (res) => {
      if(res!==undefined){
        const url = 'http://localhost:5000'
        await axios.post(`${url}/signup`,res.profileObj);
          setAccount(res.profileObj);
          setCurrentUser(res.profileObj);
      }else setAccount(undefined);
  } 
  const onLoginFailure = ()=> {
      console.log("Login Failed")
  }
  return (
    <>
      <GoogleLogin
        clientId={cid}
        buttonText="Login"
        onSuccess={onLoginSuccess}
        onFailure={onLoginFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </>
  );
};

export default ReactGLogin;
