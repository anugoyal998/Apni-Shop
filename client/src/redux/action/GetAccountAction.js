import * as actionType from '../constants.js'
import GoogleLogin from "react-google-login";

export const getAccount = ()=> async (dispatch)=> {
    const cid =
    "900254160655-h7gk2jaqt75gaj8qki7prt25ilpuola6.apps.googleusercontent.com";
    const onLoginSuccess = async (res)=> {
        dispatch({type: actionType.GET_ACCOUNT_LOADING, payload: "Loading"})
        dispatch({type: actionType.GET_ACCOUNT_SUCCESS, payload: res.profileObj})
        dispatch({type: actionType.GET_ACCOUNT_FAIL, payload: "Error"})
    }
    const onLoginFailure = ()=> {
        console.log("onLoginFailure")
    }
    return <GoogleLogin
    clientId={cid}
    buttonText="Login"
    onSuccess={onLoginSuccess}
    onFailure={onLoginFailure}
    cookiePolicy={"single_host_origin"}
    isSignedIn={true}
            />

}