import React from "react";
import './style.css'
import Addnewinquilino from "../addnewinquilino/Addnewinquilino";
import {Link} from "react-router-dom"
import styled from "styled-components"
import { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import M from 'materialize-css/dist/js/materialize.min.js';

function AddNewPropietario(props) {

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
        width: 600,
        bgcolor: '#E3DCCA',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    
    
    return (
        <>
        <div>
        <Button onClick={openModal} id="boton">Agregar Propietario</Button>
        <Modal
        open={showModal}
        onClose={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box  sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            AGREGAR PROPIETARIO
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div class="row">
            <form class="col s12">
            <div class="row">
                
            <div class="input-field col s10">
            <i class="material-icons prefix">account_circle</i>
            <input id="Nombre" type="text" class="validate"/>
            <label for="Nombre">Nombre y Apellido</label>
            </div>

            <div class="input-field col s10">
            <i class="material-icons prefix">home</i>
            <input id="Domicilio" type="text" class="validate"/>
            <label for="Domicilio">Domicilio</label>
            </div>

            <div class="input-field col s10">
            <i class="material-icons prefix">phone</i>
            <input id="Telefono" type="text" class="validate"/>
            <label for="Telefono">Telefono</label>
            </div>

            <div class="input-field col s8">
            <i class="material-icons prefix">person_pin_circle</i>
            <input id="Cuit" type="text" class="validate"/>
            <label for="Cuit">CUIT</label>
            </div>

            <div class="input-field col s12">
            <select className="browser-default">
            <option value="" disabled selected>
            Localidad
            </option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
            <option value="4">Option 4</option>
            </select>
            </div>

            <div class="input-field col s10">
            <i class="material-icons prefix">markunread_mailbox</i>
            <input id="first_name" type="text" class="validate"/>
            <label for="first_name">Codigo Postal</label>
            </div>

            <button class="btn waves-effect waves-light" type="submit" name="action" id="a">GUARDAR

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

export default AddNewPropietario;