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
import { useHistory, useParams } from "react-router-dom";
function AddNewInquilino(props) {
    let user = window.sessionStorage.getItem("user")
    user = JSON.parse(user)
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


    const [showModal, setShowModal] = useState(false)

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
        width: 420,
        bgcolor: '#E3DCCA',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [option, setOption] = useState(true)

    const wichone = () =>{
        setOption(true)
        console.log("CAMBIO DE FORM", option)
    }
    const wichone2 = () =>{
        setOption(false)
        console.log("CAMBIO DE FORM", option)
    }
    const {id} = useParams();
    const {idnh} = useParams();
    const [items, setItems] = useState([]);
    const[datoBusqueda, setdatoBusqueda] = useState([])
    useEffect(() =>{
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user.token}`)
        console.log(user.token)
        console.log(id)
        console.log(idnh)
        
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
    
        fetch(`http://localhost:4000/roomers`, requestOptions)
        .then(response => response.json())
        .then(result => {
            setItems(result)
        })
        .catch(error => console.log('error', error));
        }, []);
    
        useEffect(()=>{
            console.log("CONSOLE LOG DE ITEMS",items)
        },[items])


    function assignInquilinos(){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user.token}`)
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": inquilinoID.current.value
          });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(`http://localhost:4000/consortiums/${id}/units/${idnh}/roomers`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

        window.location.reload(false);
    }

    const name = useRef(null)
    const lastname = useRef(null)
    const cuit = useRef(null)
    const address = useRef(null)
    const province = useRef(null)
    const locality = useRef(null)
    const neighborhood = useRef(null)

    function postInquilinos(){
        
        
        
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user.token}`)
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "name": name.current.value,
        "lastName": lastname.current.value,
        "cuit": cuit.current.value,
        "address": address.current.value,
        "province": province.current.value,
        "locality": locality.current.value,
        "neighborhood": neighborhood.current.value
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(`http://localhost:4000/consortiums/${id}/units/${idnh}/roomers`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

        window.location.reload(false);
        }
        const inquilinoID = useRef(null)

        const [localidad, setLocalidades] = useState([])
        function getprovince(){
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${user.token}`);
    
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
            console.log("TOKEN",user.token)
        },[localidad])
    
        const [cambio, setcambio] = useState()
        
        const [localidadelegida, setlocalidadelegida] = useState([])
        const [getbarrioelegido, setGetbarrio] = useState([])
        function getLocalidad(){
            
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${user.token}`);
    
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
            myHeaders.append("Authorization", `Bearer ${user.token}`);
    
            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };
    
            fetch(`http://localhost:4000/provinces/${province.current.value}/localities/${locality.current.value}/neighborhoods`, requestOptions)
            .then(response => response.json())
            .then(result => setGetbarrio(result.body))
            .catch(error => console.log('error', error));
    
        }
    return (
        <>
        <div>
        <Button onClick={openModal} id="boton">Asignar Inquilino</Button>
        <Modal
        open={showModal}
        onClose={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box  sx={style}>
        {option? 
            <>
            <Typography id="modal-modal-title" variant="h6" component="h4"><i class="material-icons" id="">class</i>
            Asignar Inquilino
            </Typography>
            <Typography id="modal-modal-description" >
            
            
            <div className="botonesdecambisos">
            
            <a class="waves-effect waves-light btn" onClick={wichone}>ASIGNAR</a>
            <a class="waves-effect waves-light btn" id="botondecambio1" onClick={wichone2}><i class="material-icons">chevron_right</i></a>
            </div>
            
            <select className="browser-default"  id="selectconsorcio33"  ref={inquilinoID}>
            <option value="" disabled selected>
            Inquilinos
            </option>
            {items.map((option) => (
            <option value={option.id} >{option.name + " "+ option.lastName}</option>
            ))}
            </select>

            

            
            <div className="botonguardado">
            <a class="btn" id="boton1" onClick={assignInquilinos}>ASIGNAR</a>
            </div>
            

            </Typography>
            </>
            :
            <>
            <Typography id="modal-modal-title" variant="h6" component="h4"><i class="material-icons" id="">class</i>
            Agregar Inquilino
            </Typography>
            <Typography id="modal-modal-description" >
            
            
            <div className="botonesdecambisos">
            
            <a class="waves-effect waves-light btn" id="botondecambio1" onClick={wichone}><i class="material-icons">chevron_left</i></a>
            <a class="waves-effect waves-light btn" onClick={wichone2}>AGREGAR</a>
            </div>

            <div class="input-field col s10" id="descripcion">
            <input id="NombreyApellido" className="descripcion" type="text" class="validate" ref={name}/>
            <label for="NombreyApellido">Nombre</label>
            </div>
            <div class="input-field col s10" id="descripcion">
            <input id="lastname" className="descripcion" type="text" class="validate" ref={lastname}/>
            <label for="lastname">Apellido</label>
            </div>
            <div class="input-field col s10" id="descripcion1">
            <input id="Domicilio" className="descripcion" type="text" class="validate" ref={address}/>
            <label for="Domicilio">Domicilio</label>
            </div>
            
            <div class="input-field col s10" id="descripcion3">
            <input id="cuit" className="descripcioncuit" type="text" class="validate" ref={cuit}/>
            <label for="cuit">CUIT</label>
            </div>

            <select className="browser-default"  id="selectconsorcio33"  ref={province} onClick={getprovince}>
            <option value="" disabled selected>
            Provincia
            </option>
            {localidad.map((option) => (
            <option value={option.id} >{option.name}</option>
            ))}
            </select>
            <select className="browser-default"  id="selectconsorcio33"  ref={locality} onClick={getLocalidad}>
            <option value="" disabled selected>
            Localidad
            </option>
            {localidadelegida.map((option) => (
            <option value={option.id} >{option.name}</option>
            ))}
            </select>
            <select className="browser-default"  id="selectconsorcio33"  ref={neighborhood} onClick={getBarrio}>
            <option value="" disabled selected>
            Barrio
            </option>
            {getbarrioelegido.map((option) => (
            <option value={option.id} >{option.name}</option>
            ))}
            </select>

            

            <div className="botonguardado">
            <a class="btn" id="boton1" onClick={postInquilinos}>AGREGAR</a>
            </div>
            </Typography></>
            }
        </Box>
        </Modal>
    </div>  
-</>
);
}

export default AddNewInquilino;
