import React from "react";
import './style.css'
import Addnewinquilino from "../addnewinquilino/Addnewinquilino";
import {Link} from "react-router-dom"
import styled from "styled-components"
import { useState, useRef, useEffect } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import M from 'materialize-css/dist/js/materialize.min.js';
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authAtom } from "../../_state/Auth";
import { Checkbox } from "@material-ui/core";

function AddConcepto(props) {
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
        width: 510,
        bgcolor: '#E3DCCA',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const denominacion = useRef(null)
    const negativo = useRef(null)
    const debehaber = useRef(null)
    const {id} = useParams();
    const [coeficiente, setCoeficiente] = useState([])
    const tipocoef = useRef(null)
    useEffect(() =>{
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${auth.token}`)

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        
        fetch("http://localhost:4000/coefficients", requestOptions)
            .then(response => response.json())
            .then(result => {
                setCoeficiente(result)
                console.log("COEFICIENTES",coeficiente)
            })
            .catch(error => console.log('error', error));
    }, []);
    const [distrib, setDistrib] = useState(false)
    function postConcepto(){
        
        var myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${auth.token}`)
        
        var raw = JSON.stringify(
            {
                "name": denominacion.current.value,
                "coefficient": {"id":tipocoef.current.value},
                "origin": debehaber.current.value,
                "type": tipodeconcepto.current.value,
                "description": checkedOne,
                "priority": prioridad.current.value
            }
        );
        
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://localhost:4000/concepts`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('ERROR', error));
        }

    const [checkedOne, setCheckedOne] = React.useState(false);
    const handleChange = () => {
        setCheckedOne(!checkedOne);
        
    };

    const [checkTwo, setCheckedTwo] = React.useState(false);
    const handleChange2 = () => {
        setCheckedTwo(!checkedOne);
        console.log(checkedOne)
    };
    
    const [d, setD] = useState([])

    function pruebadetipo (event) {
        console.log(tipocoef.current.value)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${auth.token}`)

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        
        fetch(`http://localhost:4000/coefficients/${tipocoef.current.value}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setDistrib(result.distributable)
            })
            .catch(error => console.log('error', error));
        
    }
    function getoringen(){
        console.log("DEBE HABER",debehaber.current.value)
    }
    
    const prioridad = useRef(null)

    function getprioridad(){
        console.log("DEBE HABER",prioridad.current.value)
    }

    const tipodeconcepto = useRef(null)

    function gettipoconcep (){
        console.log(tipodeconcepto.current.value)
    }
    return (
        <>
        <div>
        <Button onClick={openModal} id="boton">Agregar Concepto</Button>
        <Modal
        open={showModal}
        onClose={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box  sx={style}>

            <Typography id="modal-modal-title" variant="h6" component="h2">
            <i class="material-icons prefix">folder_open</i>
            AGREGAR CONCEPTO
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div class="row">
            <form class="col s12">
            <div class="row">

            <div class="input-field col s10" id="denominacionid">
            <i class="material-icons prefix">content_paste</i>
            <input id="Denominacion" type="text" class="validate" ref={denominacion}/>
            <label for="Denominacion">Denominacion</label>
            </div>

            <div class="input-field col s5" >
            <i class="material-icons prefix">low_priority</i>
            <input id="prioridad" type="text" class="validate" ref={prioridad} onChange={getprioridad}/>
            <label for="prioridad">Prioridad</label>
            </div>

            <select className="browser-default"  id="selectconsorcio3" ref={debehaber} onChange={getoringen} >
            <i class="material-icons prefix">content_paste</i>
            <option value="" disabled selected>
            Origen
            </option>
            
            <option value="Debe" >Debe</option>
            <option value="Haber" >Haber</option>
            </select>

            <select className="browser-default"  id="selectconsorcio5"  ref={tipocoef} onChange={pruebadetipo}>
            <i class="material-icons prefix">content_paste</i>
            <option value="" disabled selected>
            Coeficiente
            </option>
            {coeficiente.map((option) => (
            <option value={option.id}>{option.name}</option>
            ))}
            </select>


            {distrib ? 
            <select className="browser-default"  id="selectconsorcio5"  ref={tipodeconcepto} onChange={gettipoconcep}>
            <i class="material-icons prefix">content_paste</i>
            <option value="NO APLICA" disabled selected>
            NO APLICA
            </option>
            </select>
            :
            <select className="browser-default"  id="selectconsorcio5"  ref={tipodeconcepto} onChange={gettipoconcep}>
            <i class="material-icons prefix">content_paste</i>
            <option value="" disabled selected>
            Tipo de concepto
            </option>
            <option value="Impuesto" >Impuesto</option>
            <option value="Alquiler" >Alquiler</option>
            </select>
            }
            

            <div class="input-field col s5" id="incdesc">
            <p>
            <label>
            <input type="checkbox" class="filled-in" value={checkedOne} onChange={handleChange} />
            <span>Incluye Descripcion</span>
            </label>
            </p>
            </div>

            <div class="input-field col s5" id="inciva">
            <p>
            <label>
            <input type="checkbox" class="filled-in" value={checkTwo} onChange={handleChange2} />
            <span>Incluye IVA LG</span>
            </label>
            </p>
            </div>

            <button class="btn waves-effect waves-light" type="submit" name="action" id="submitbtn3" onClick={postConcepto}>GUARDAR

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

export default AddConcepto;