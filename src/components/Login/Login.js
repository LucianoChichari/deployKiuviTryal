import React from 'react'
import "./loginstyle.css"
import { useState, useEffect} from 'react'
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import loginhumo from '../../assets/IconsAndImagesLogin/humo.gif'
import loginlogo from '../../assets/IconsAndImagesLogin/gifbuilding.gif'
import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useRecoilValue} from 'recoil'
import { authAtom } from '../../_state';
import {useForm} from 'react-hook-form'
import {useUserActions} from '../../_actions/user.actions'
import {Redirect} from 'react-router-dom'
import { useHistory } from "react-router-dom";

function Login() {
    useEffect(() => {
        // redirect to home if already logged in
        
        if (auth) history.push('/');
        
    }, []);
    
    const auth = useRecoilValue(authAtom);
    const userActions = useUserActions();
    let history = useHistory();
    
    
    const notify = () => toast("Login Button Clicked!",{
        position: toast.POSITION.TOP_CENTER
    });

    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, setError, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    function onSubmit({ username, password }) {
        userActions.login(username, password)
    }


    return (

        <div className="contenedor-base">
        
        <div className="contenido">
        <div className="image">
            <img className="imgcasa" alt="img" src={loginlogo}/>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="form-group">
                            <label id="inputchange">Usuario</label>
                            <input id="inputchange" placeholder="Usuario" name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.username?.message}</div>
                        </div>
                        <div className="form-group">
                            <label id="inputchange">Contraseña</label>
                            <input id="inputchange" placeholder="Contraseña" name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <button disabled={isSubmitting} className="btn" >
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1">{notify}</span>}
                            Ingresar
                        </button>
            </form>
            <ToastContainer />
        </div>
        {errors.apiError &&
                            <div className="alert alert-danger mt-3 mb-0">{errors.apiError?.message}</div>
                        }
    </div>
    
    );
}

export default Login;
