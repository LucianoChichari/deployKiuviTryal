import React from "react";
import './style.css'
import Addnewinquilino from "../addnewinquilino/Addnewinquilino";
import {Link} from "react-router-dom"
import styled from "styled-components"
import { useState, useRef } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import M from 'materialize-css/dist/js/materialize.min.js';
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authAtom } from "../../_state/Auth";

function AddUnit(props) {
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
        width: 500,
        bgcolor: '#E3DCCA',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const denominacion = useRef(null)
    const {id} = useParams();
    function postUnidad(){

        var myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${auth.token}`)

var raw = JSON.stringify({
"name": denominacion.current.value
});

var requestOptions = {
method: 'POST',
headers: myHeaders,
body: raw,
redirect: 'follow'
};

fetch(`http://localhost:4000/consortiums/${id}/units`, requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));
    }
    
    return (
        <>
        <div>
        <Button onClick={openModal} id="boton">Agregar Unidad</Button>
        <Modal
        open={showModal}
        onClose={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box  sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            AGREGAR UNIDAD
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div class="row">
            <form class="col s12">
            <div class="row">

            <div class="input-field col s10">
            <i class="material-icons prefix">content_paste</i>
            <input id="Detalle" type="text" class="validate" ref={denominacion}/>
            <label for="Detalle">Detalle</label>
            </div>

            <button class="btn waves-effect waves-light" type="submit" name="action" id="submitbtn3" onClick={postUnidad}>GUARDAR

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

export default AddUnit;