import React from "react";
import './style.css'
import Addnewinquilino from "../addnewinquilino/Addnewinquilino";
import {Link} from "react-router-dom"
import styled from "styled-components"
import { useState, useEffect, useRef } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import M from 'materialize-css/dist/js/materialize.min.js';
import axios from "axios";
import { useRecoilState } from "recoil";
import { authAtom } from "../../_state/Auth";
import { Alert } from "@mui/material";

const baseURL = "http://localhost:4000/consortiums"


function AddNewConsortium(props) {
    const [auth, setAuth] = useRecoilState(authAtom);
    const Button = styled.button`
    min-width: 280px;
    padding: 16px 32px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    float: right;
    margin-right: 200px;
    background-color:  #12212C;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #1DC8C8;
    width: 200px;
    height: 42px;
    left: 1243px;
    top: 307px; 
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px #1DC8C8;
    border-radius: 4px;
    box-sizing: border-box;
    `

//<button class="btn transparent" id="addcon" onClick={pruebaonclick}>AGREGAR UNIDAD</button>
    const openModal = () =>{
        setShowModal(prev => !prev)
    }
    const pruebaonclick = () =>{
        console.log("onclick")
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: '#E3DCCA',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [post, setPost] = useState([])

    const [showModal, setShowModal] = useState(false)

    const denominacion = useRef(null)
    const domicilio = useRef(null)
    var barrio = useRef(null)
    var localidad = useRef(null)
    const cuit = useRef(null)
    var province = useRef(null)
    const [localidades, setLocalidades] = useState([])
    const [localidadelegida, setlocalidadelegida] = useState([])
    function postConsorcio(){


        var myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${auth.token}`)
        
        
        var raw = JSON.stringify({
            "name": denominacion.current.value,
            "address": domicilio.current.value,
            "cuit": cuit.current.value,
            "province": {
            "id": province.current.value
            },
            "locality": {
            "id": localidad.current.value
            },
            "neighborhood": {
            "id": barrio.current.value
            }
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        
        
        fetch("http://localhost:4000/consortiums", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    function getprovince(){
        barrio.current.value = null;
        localidad.current.value = null;
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${auth.token}`);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

        fetch("http://localhost:4000/provinces", requestOptions)
        .then(response => response.json())
        .then(result => setLocalidades(result))
        .catch(error => console.log('error', error));
    }

    useEffect(()=>{
        console.log("PROVINCIAS",localidades)
        var mapeado = localidades.map(loc => ({ id: loc.id}));
        console.log("MAPEADO",mapeado)
        console.log("TOKEN",auth.token)
    },[localidades])

    const [cambio, setcambio] = useState()
    

    const [getbarrioelegido, setGetbarrio] = useState([])
    function getLocalidad(){
        barrio.current.value= null;
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${auth.token}`);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
        
        fetch(`http://localhost:4000/provinces/${province.current.value}/localities`, requestOptions)
        .then(response => response.json())
        .then(result => setlocalidadelegida(result.body))
        .catch(error => console.log('error', error));

        
        
    }
    
    function getBarrio(){
        
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${auth.token}`);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(`http://localhost:4000/provinces/${province.current.value}/localities/${localidad.current.value}/neighborhoods`, requestOptions)
        .then(response => response.json())
        .then(result => setGetbarrio(result.body))
        .catch(error => console.log('error', error));

    }
    
    
    return (
        <>
        <div>
        <Button onClick={openModal} id="boton">Agregar Consorcio</Button>

        <Modal
        open={showModal}
        onClose={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >

        <Box  sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            AGREGAR CONSORCIO
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div class="row">
            <form class="col s12">
            <div class="row">

            <div class="input-field col s10">
            <i class="material-icons prefix">class</i>
            <input id="Denominacion" type="text" class="validate" ref={denominacion}/>
            <label for="Denominacion">Denominacion</label>
            </div>

            <div class="input-field col s10">
            <i class="material-icons prefix">home</i>
            <input id="Domicilio" type="text" class="validate" ref={domicilio}/>
            <label for="Domicilio">Domicilio</label>
            </div>

            <div class="input-field col s12">
            <select className="browser-default" ref={province} onClick={getprovince} >
            <option value="" disabled selected>
            Provincia
            </option>
            {localidades.map((option) => (
            <option value={option.id} >{option.name}</option>
            ))}

            </select>

            </div>
            
            <div class="input-field col s12">
            <select className="browser-default" ref={localidad} onClick={getLocalidad}>
            <option value="" disabled selected >
            Localidad
            </option>
            {localidadelegida.map((option) => (
                <>
            <option value={option.id} >{option.name}</option></>
            ))
            }
            
            </select>
            </div>

            <div class="input-field col s12">
            <select className="browser-default" ref={barrio} onClick={getBarrio}> 
            <option value="" disabled selected >
            Barrio
            </option>
            {getbarrioelegido.map((option) => (
            <option value={option.id} >{option.name}</option>

            ))}
            </select>
            </div>

            <div class="input-field col s10">
            <i class="material-icons prefix">person_pin_circle</i>
            <input id="first_name" type="text" class="validate" ref={cuit}/>
            <label for="first_name">CUIT</label>
            </div>

            <button class="btn waves-effect waves-light" type="submit" name="action" id="boton1" onClick={postConsorcio} >GUARDAR

            </button>

            </div>
            </form>
            </div>
            </Typography>
        </Box>
        </Modal>
    </div>  
        </>
    );
}

export default AddNewConsortium;