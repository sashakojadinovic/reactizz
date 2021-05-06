import React, {useState, useContext} from 'react';
import GoogleLogin from 'react-google-login';
import {QContext} from '../QContext';
function Login(props) {
    const qContext  = useContext(QContext);
    const [userData, setUserData] = useState({});
    function responseGoogle(response){
        console.log(response);
        qContext.setGuser(response.profileObj);
        props.login(true,response.profileObj);
    }
    if(qContext.questions){
        return (
            <div className="login-container">  
                <h2>Test ID:39482384</h2> 
                <h2>Naziv: Struktura atoma</h2>
                <h2>Broj pitanja: { qContext.questions.length}</h2>
                <button onClick={()=>props.login(true)} className="btn anonimous-login-btn">Uđi anonimno</button> <br /> <br />       
                <GoogleLogin
                clientId="916580169429-3s5ukesqr7r0spp8j4r0ldgqf37n7aj5.apps.googleusercontent.com"
                buttonText="Prijavi se preko svog Google naloga"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                className="google-login-btn"              
                /> 
            </div>
        );
       
    }
    else {
        return 'Loading...';
    }
    
}

export default Login;
