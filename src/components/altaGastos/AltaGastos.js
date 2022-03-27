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
import 'materialize-css'
import { useRecoilState } from "recoil";
import { userAtom } from "../../_state/Users";
import { set } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast, Flip} from 'react-toastify';
import { Slide, Zoom, Bounce } from 'react-toastify';
import { useHotkeys } from 'react-hotkeys-hook';
const baseURL = "http://localhost:4000/consortiums"


function AltaGastos(props) {
    
    useHotkeys('shift+x', () => wichone2())
    useHotkeys('shift+z', () => wichone())

    const notify = () => toast.success('Carga Exitosa!', {
        position: "top-right",
        autoClose: 800,
        transition: Flip,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    
    const notifyWarn = () => toast.error('Error en la carga!', {
        position: "top-right",
        transition: Flip,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

    const [datee, setDatee] = useState(new Date());
    const [datePGasto, setDatePG] = useState(new Date());
    const [datePLiq, setDatePL] = useState(new Date());
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

//<button class="btn transparent" id="addcon" onClick={pruebaon--click}>AGREGAR UNIDAD</button>
    const openModal = () =>{
        setShowModal(prev => !prev)
        console.log(showModal)
    }
    const pruebaonclick = () =>{
        console.log("onclick")
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 750,
        bgcolor: '#E3DCCA',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [consorcios, setConsorcios] = useState([]);
    const [unidades, setUnidades] = useState([]);
    const [pickone, setPickone] = useState(0)
    const [post, setPost] = useState([])

    const [showModal, setShowModal] = useState(false)

    const denominacion = useRef(null)
    const domicilio = useRef(null)
    const barrio = useRef(null)
    const localidad = useRef(null)
    const cuit = useRef(null)
    const province = useRef(null)
    const chosenoption = useRef(null)
    const valorcons = useRef(null)
    const valunidad = useRef(null)
    const conceptoid = useRef(null)
    const importe = useRef(null)
    const nrodecomp = useRef(null)


    const consorciounidad = () =>{
        setPickone(chosenoption.current.value)
        console.log("PICKONE",setPickone)
    }

    const [selectedConsortium, setSelectedConsortium] = useState("")
    function getConsorcio(){
        var myHeaders = new Headers();
        console.log("USERATOM",user.token)
        myHeaders.append("Authorization", `Bearer ${user.token}`)
        
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("http://localhost:4000/consortiums", requestOptions)
        .then(response => response.json())
        .then(result => setConsorcios(result))
        .catch(error => console.log('error', error));

    
    }
    const [concepts, setConcepts] = useState([])
    const [conceptstrue, setConceptsTrue] = useState([])
    const [conceptsFalse, SetConceptsFalse] = useState([])
    function getConceptos(){
        var myHeaders = new Headers();
        console.log("USERATOM",user.token)
        myHeaders.append("Authorization", `Bearer ${user.token}`)
        
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        
        fetch("http://localhost:4000/concepts", requestOptions)
            .then(response => response.json())
            .then(result => {
                setConcepts(result)
                setConceptsTrue(result.filter(function(conceptos){
                    return conceptos.coefficient.distributable === true
                }))
                SetConceptsFalse(result.filter(function(conceptos){
                    return conceptos.coefficient.distributable === false
                }))
            })
            .catch(error => console.log('error', error));

            
        
    }

    const [option, setOption] = useState(true)

    const wichone = () =>{
        setOption(true)
        valorcons.current.value = "";
        console.log("CAMBIO DE FORM", option)
    }
    const wichone2 = () =>{
        valorcons.current.value = "";
        setOption(false)
        console.log("CAMBIO DE FORM", option)
    }

    
    
    function getUnit (){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user.token}`)
        
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

        fetch(`http://localhost:4000/consortiums/${valorcons.current.value}/units`, requestOptions)
        .then(response => response.json())
        .then(result => {
            setUnidades(result.body)
        }).catch(e=>{
            console.log(e)
        })
    }
//http://localhost:4000/consortiums/1/units/1/outlays
    function postGastoConsorcio(event){
        console.log(conceptoid.current.value)
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user.token}`)
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "concept": {
        "id": conceptoid.current.value
        },
        "description": denominacion.current.value,
        "date": datee.toISOString().split('T')[0],
        "outlayPeriod": datePGasto,
        "settledPeriod": datePLiq.toISOString().split('T')[0],
        "amount": importe.current.value,
        "voucherNumber": nrodecomp.current.value
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(`http://localhost:4000/consortiums/${valorcons.current.value}/outlays`, requestOptions)
        .then(response => response.text())
        .then(result => onresult())
        .catch(error => notifyWarn());
    }
const [checkeo, setcheckeo] = useState("")
function done(){
    if(checkeo == "Outlay assigned successfuly."){
       return notify()
    }
}

    const [auxiliarpriodogasto, setAUXPERGAS] = useState(new Date())
    const [mockdate, setMockdate] = useState(new Date());
    function onresult(){
        notify()
        denominacion.current.value = null;
        importe.current.value = null;
        nrodecomp.current.value = null;
        conceptoid.current.value = 0;
    }
    const [date, setDate] = useState(new Date());
    const fechahandle = (date) => {
        mockdate.setDate(date.getDate());
        setDate(date.setUTCHours(0,0,0,0))
        setDatePG(date.toISOString())
    }
    function postGastoUnidad(event){
        event.preventDefault();
        
        console.log(datePGasto)
        
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user.token}`)
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "concept": {
        "id": conceptoid.current.value
        },
        "description": denominacion.current.value,
        "date": datee.toISOString().split('T')[0],
        "outlayPeriod": datePGasto,
        "settledPeriod": datePLiq.toISOString(),
        "amount": importe.current.value,
        "voucherNumber": nrodecomp.current.value
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(`http://localhost:4000/consortiums/${valorcons.current.value}/units/${valunidad.current.value}/outlays`, requestOptions)
        .then(response => response.json())
        .then(result => onresult())
        .catch(error => notifyWarn());
        
        
    }
    const handleKeypress = e => {
        if (e.keyCode === 13) {
        postGastoUnidad();
        }
    };

    const handleKeypress2 = e => {
        if (e.keyCode === 13) {
        postGastoConsorcio();
        }
    };
    function pruebadetipo () {
        
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user.token}`)

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        
        fetch(`http://localhost:4000/coefficients/${conceptoid.current.value}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result.distributable)
            })
            .catch(error => console.log('error', error));
        
    }
        const [descrip, setDescrip] = useState(false)
        function pruebadetipo (event) {
            console.log(conceptoid.current.value)
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${user.token}`)
    
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            
            fetch(`http://localhost:4000/concepts/${conceptoid.current.value}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setDescrip(result.description)
                })
                .catch(error => console.log('error', error));
            
        }
    return (
        <>
        <div>
        <li><a class="prueba" onClick={openModal} style={{cursor:'pointer'}}> Alta Gastos <i class="material-icons">keyboard_arrow_right</i></a></li>
        <Modal
        open={showModal}
        onClose={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box  sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2"><i class="material-icons" id="">class</i>
            ALTA DE GASTOS <div class="input-field col s10" id="FechaAltaGastos">
            
            </div>
            </Typography>
            
            {option? 
            <>
            <Typography id="modal-modal-description">
            
            
            <div className="botonesdecambiso">
            <a class="waves-effect waves-light btn" id="botondecambio1"  onClick={wichone}>unidad</a>
            <a class="waves-effect waves-light btn" onClick={wichone2}><i class="material-icons">chevron_right</i></a>
            </div>
            <hr width="680px" size="8" align="center" id="separador2"/>
            <select className="browser-default" id="selectconsorcio7" ref={valorcons} onClick={getConsorcio} onChange={getUnit}> 
            <option value="" disabled selected >
            CONSORCIOS
            </option>
            {consorcios.map((option) => (
            <option value={option.id} >{option.name}</option>
            ))}
            </select>

            <select className="browser-default"  id="selectconsorcio7" ref={valunidad} onChange={getConceptos}>
            <option value="" disabled selected>
            UNIDAD
            </option>
            {unidades.map((option) => (
            <option value={option.id} >{option.name}</option>
            ))}
            </select>
            <hr width="680px" size="8" align="center" id="separador"/>
            

            </Typography>
            
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                
            <div class="row">
            <form class="col s12" >
            <div class="row">

            <div class="input-field col s10" id="periodogasto">

            
            
            <DatePicker dateFormat="yyyy/MM/dd" preventOpenOnFocus={true} selected={mockdate} onChange={date => fechahandle(date)} />
            <p>Periodo Gasto</p>
            
            
            </div>

            <div class="input-field col s10" id="periodoaliq">
            
            <input type="date" max='4000-01-01'/>
            <p>Periodo a Liquidar</p>
            </div>

            <div class="input-field col s10" id="periodoaliq2">
            
            <DatePicker dateFormat="yyyy/MM/dd" preventOpenOnFocus={true} selected={datee} onChange={date => setDatee(date)} />
            <p>Fecha Actual</p>
            </div>
            
            
            <select className="browser-default" id="selectconsorcio5" onClick={getConceptos} ref={conceptoid} onChange={pruebadetipo}>
            <option value="" disabled selected>
            CONCEPTO
            </option>
            {conceptsFalse.map((option) => (
            <option  value={option.id} >{option.name}</option>
            
            ))}
            </select>

            {descrip ? 
            <div class="input-field col s10" id="descripcion">
            <i class="material-icons prefix">description</i>
            <input id="descripcion" type="text" class="validate" onKeyPress={handleKeypress} ref={denominacion}/>
            <label for="descripcion">Descripcion</label>
            </div>
            : 
            <div class="input-field col s10" id="descripcion">
            <i class="material-icons prefix">description</i>
            <input id="descripcion2" type="text" class="validate" placeholder="" onKeyPress={handleKeypress} ref={denominacion} disabled/>
            <label for="descripcion">Sin Descripcion</label>
            </div>
            }
            
            
            <div class="input-field col s10" id="importe">
            <i class="material-icons prefix">account_balance_wallet</i>
            <input id="importein" type="text" class="validate" onKeyPress={handleKeypress} ref={importe}/>
            <label for="importein">importe</label>
            </div>


            <div class="input-field col s10" id="nrocomp">
            <i class="material-icons prefix">confirmation_number</i>
            <input id="nrocompro" type="text" class="validate" onKeyPress={handleKeypress} ref={nrodecomp}/>
            <label for="nrocompro">Nro. Comp.</label>
            </div>

            </div>
            
            <div id="botonguardado6">
            <button class="btn waves-effect waves-light"  name="action" id="boton12" onClick={postGastoUnidad}>GUARDAR

            </button>
            </div>
            </form>
            </div>
            
            <ToastContainer/>
            
            </Typography>
            </>
            :
                <>
            <Typography id="modal-modal-description" >
            <div className="botonesdecambiso">
            <a class="waves-effect waves-light btn" onClick={wichone}><i class="material-icons">chevron_left</i></a>
            <a class="waves-effect waves-light btn" id="botoncambio2" onClick={wichone2}>consorcio</a>
            </div>
            
            <hr width="680px" size="8" align="center" id="separador2"/>
            <select className="browser-default" id="selectconsorcioxi" ref={valorcons} onClick={getConsorcio} onChange={getConceptos}> 
            <option value="" disabled selected >
            CONSORCIOS
            </option>
            {consorcios.map((option) => (
            <option value={option.id} >{option.name}</option>

            ))}
            </select>

            
        

            </Typography>
            <>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div class="row">
            <form class="col s12" >
            <div class="row">

            <div class="input-field col s10" id="periodogasto">

            

            <DatePicker dateFormat="yyyy/MM/dd" preventOpenOnFocus={true} selected={mockdate} onChange={date => fechahandle(date)} />
            <p>Periodo Gasto</p>
            </div>

            <div class="input-field col s10" id="periodoaliq">
            
            <input type="date" max='4000-01-01'/>
            <p>Periodo a Liquidar</p>
            </div>

            <div class="input-field col s10" id="periodoaliq2">
            
            <DatePicker dateFormat="yyyy/MM/dd" preventOpenOnFocus={true} selected={datee} onChange={date => setDatee(date)} />
            <p>Fecha Actual</p>
            </div>



            <hr width="680px" size="8" align="center" id="separador5"/>
            <select className="browser-default" id="selectconsorcio5" onClick={getConceptos} ref={conceptoid} onChange={pruebadetipo}>
            <option value="" disabled selected>
            CONCEPTO
            </option>
            {conceptstrue.map((option) => (
            <option  value={option.id} >{option.name}</option>
            
            ))}
            </select>
            {descrip ? 
            <div class="input-field col s10" id="descripcion">
            <i class="material-icons prefix">description</i>
            <input id="descripcion" type="text" class="validate" onKeyPress={handleKeypress} ref={denominacion}/>
            <label for="descripcion">Descripcion</label>
            </div>
            : 
            <div class="input-field col s10" id="descripcion">
            <i class="material-icons prefix">description</i>
            <input id="descripcion2" type="text" class="validate" placeholder="" onKeyPress={handleKeypress} ref={denominacion} disabled/>
            <label for="descripcion">Sin Descripcion</label>
            </div>
            }
            
            <div class="input-field col s10" id="importe">
            <i class="material-icons prefix">account_balance_wallet</i>
            <input id="importein" type="text" class="validate" ref={importe} onKeyPress={handleKeypress2}/>
            <label for="importein">importe</label>
            </div>


            <div class="input-field col s10" id="nrocomp">
            <i class="material-icons prefix">confirmation_number</i>
            <input id="nrocompro" type="text" class="validate" ref={nrodecomp} onKeyPress={handleKeypress2}/>
            <label for="nrocompro">Nro. Comp.</label>
            </div>

            </div>
            
            <div id="botonguardado">
            <button class="btn waves-effect waves-light"  name="action" id="boton12" onClick={postGastoConsorcio}>GUARDAR

            </button>
            </div>
            </form>
            </div>
            <ToastContainer/>
            </Typography>
            </></>
            }
            
        </Box>
        </Modal>
    </div>  
        </>
    );
}

export default AltaGastos;