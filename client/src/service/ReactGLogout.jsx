import  GoogleLogout  from 'react-google-login';

const ReactGLogout = ()=> {
    const handleLogoutSuccess = () => {
        console.log("logout success");
    }
    const cid =
    "900254160655-h7gk2jaqt75gaj8qki7prt25ilpuola6.apps.googleusercontent.com";
    return(
        <GoogleLogout
        clientId={cid}
        buttonText="Logout"
        onLogoutSuccess={handleLogoutSuccess}
        ></GoogleLogout>
    )
}

export default ReactGLogout;