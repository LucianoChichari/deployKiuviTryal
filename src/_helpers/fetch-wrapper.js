import { useRecoilState } from "recoil";

import { history } from "./history";
import { authAtom } from "../_state";

export {useFetchWrapper} ;

function useFetchWrapper(){
    const [auth, setAuth] = useRecoilState(authAtom);

    return {
        get: request('GET'),
        post: request('POST'),
        put: request('PUT'),
        delete: request('DELETE')
    };

    function request(method) {
        return (url, body) => {
            const requestOptions = {
                method,
                headers: authHeader(url)
            };
            if (body) {
                requestOptions.headers['Content-Type'] = 'application/json';
                requestOptions.body = JSON.stringify(body);
            }
            return fetch(url, requestOptions).then(handleResponse);
        }
    }

    //funciones helper
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


    function handleResponse(response) {
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            
            if (!response.ok) {
                if ([401, 403].includes(response.status) && auth?.token) {
                    // deslogeo  si el usuario no esta autorizado 
                    sessionStorage.removeItem('user');
                    setAuth(null);
                    history.push('/login');
                }
    
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
    
            return data;
        });
    } 

}
