import { useSetRecoilState } from "recoil";
import React from "react";
import { history } from "../_helpers/history";
import { useFetchWrapper } from "../_helpers/fetch-wrapper";
import { authAtom, userAtom } from "../_state";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";


import { ToastContainer, toast} from 'react-toastify';

export {useUserActions};

function useUserActions(){
    const [auth, setAuth] = useRecoilState(authAtom);

    const notifyerror = () => toast.error("Usuario o Contraseña incorrecto!",{
        position: toast.POSITION.TOP_CENTER
    });
    const notifysuccess = () => toast.success("",{
        position: toast.POSITION.TOP_CENTER
    });

    const baseUrl = `${process.env.REACT_APP_API_URL}/login`;
    const fetchWrapper = useFetchWrapper();
    const setUsers = useSetRecoilState(userAtom);
    let history = useHistory();

    return {
        login,
        logout
    }

    useEffect(()=>{
        console.log("AUTH",auth)
    },[auth])

    function tokenset (result)  {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            sessionStorage.setItem('user', JSON.stringify(result));
            setAuth(result.token);

            // get return url from location state or default to home page
            const { from } = history.location.state || { from: { pathname: '/' } };
            history.push(from);
    }

    function login(username, password) {
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
        "userName": username,
        "password": password
        });
    
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
    
        fetch("http://localhost:4000/login", requestOptions)
        .then(response => response.json())
        .then(result => tokenset(result))
        .catch(error => console.log('error', error));

    }
    function authHeader(url){
        //devuelve auth header con json web token si el usuario esta loggeado y el request es a la api url
        const token = auth?.token;
        console.log(token)
        const isLoggedIn = !!token;
        const isApiUrl = url.startsWith(process.env.REACT_APP_API_URL);
        if (isLoggedIn && isApiUrl){
            return { Authorization: `Bearer ${token}` };
        } else {
            return {};
        }
    }
    function logout(){
        sessionStorage.removeItem('user');
        setAuth(null);
        history.push('/login');
    }

}