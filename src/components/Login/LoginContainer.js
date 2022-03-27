import Login from './Login';
import 'animate.css';
import "./loginstyle.css";
import {Animated} from "react-animated-css";
import { useState} from "react";
import 'materialize-css'

function LoginContainer() {
    
    return (
    
    <div className="Index">
    <Animated animationIn="bounceIn" animationOut="bounceOutUp" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
        <div className="login">
        <div className="containerIndex">
        <Login/>
        </div>
        </div>
        </Animated>
    </div>
    
    );
}
export default LoginContainer;