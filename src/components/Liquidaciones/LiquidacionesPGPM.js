import React from "react";
import './liqstyle.css'
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
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { tableCellClasses } from "@mui/material/TableCell";
const baseURL = "http://localhost:4000/consortiums"


function LiquidacionesPGPM(props) {
    
    useHotkeys('shift+x', () => wichone2())
    useHotkeys('shift+z', () => wichone())
    const useStyles = makeStyles({
        table: {
        minWidth: 650
        }
    });
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        };
    
        const handleChangeRowsPerPage = event => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
        };
    
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        
        [`&.${tableCellClasses.body}`]: {
        fontSize: 15,
        
        },
    }));
    function createData(coeficiente, importe) {
        return {coeficiente, importe};
    }
    const rows = [
        createData("cell", 100),
        createData("cell", 100),
        createData("cell", 100),
        createData("cell", 100),
        createData("cell", 100),
        createData("cell", 100)
    ];
    const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
        
        },
        // hide last border
        '&:last-child td, &:last-child th': {
        border: 0,
        },
    }));
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
        <li><a class="prueba" onClick={openModal} style={{cursor:'pointer'}}> Generar Liquidaciones <i class="material-icons">keyboard_arrow_right</i></a></li>
        <Modal
        open={showModal}
        onClose={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box  sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2"><i class="material-icons" id="">class</i>
            GENERAR LIQUIDACIONES<div class="input-field col s10" id="FechaAltaGastos">
            
            </div>
            </Typography>
            
            {option? 
            <>
            <Typography id="modal-modal-description">
            
            
            <div className="botonesdecambiso">
            <a class="waves-effect waves-light btn" id="botondecambio1"  onClick={wichone}>por Gasto</a>
            <a class="waves-effect waves-light btn" onClick={wichone2}><i class="material-icons">chevron_right</i></a>
            </div>
            
            <select className="browser-default" id="selectconsorcio7asd" ref={valorcons} onClick={getConsorcio} onChange={getUnit}> 
            <option value="" disabled selected >
            CONSORCIOS
            </option>
            {consorcios.map((option) => (
            <option value={option.id} >{option.name}</option>
            ))}
            </select>

            <div class="input-field col s10" id="periodoaliq2a">
            
            <DatePicker dateFormat="yyyy/MM/dd" preventOpenOnFocus={true} selected={datee} onChange={date => setDatee(date)} />
            <p className="fechaactual">Periodo a Liq.</p>
            </div>
            
            

            </Typography>
            
            <TableContainer className="container" component={Paper} >
        <Table className={classes.table} aria-label="simple table">
        <TableHead className="tablehead">
        <StyledTableRow >
            <StyledTableCell id="FilaPrincipal" align="left">Coeficiente</StyledTableCell>
            <StyledTableCell id="FilaPrincipal" align="left">Importe</StyledTableCell>
            
        </StyledTableRow>
        </TableHead>
        <TableBody className="tablebody" >
        {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (<>

                <StyledTableRow>

                <StyledTableCell align="left" style={{borderBottom:"none"}}>
                {row.coeficiente}
                </StyledTableCell>
                <StyledTableCell align="left" style={{borderBottom:"none"}}>
                {row.importe}
                </StyledTableCell>
                



                </StyledTableRow>
                
</>
            ))}
            {emptyRows > 0 && (
            <StyledTableRow style={{ height: 53 * emptyRows }}>
            <StyledTableCell id="footer" colSpan={6} />
            </StyledTableRow>
            )}
        </TableBody>
        </Table>
        <TablePagination 
        rowsPerPageOptions={[4]}
        component="div"
        count={rows.length}
        rowsPerPage={5}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        
    </TableContainer>
    <a class="waves-effect waves-light btn" id="botonImprimir">Imprimir</a>
    <a class="waves-effect waves-light btn" id="botonLiquidar">Liquidar</a>
            </>
            :
                <>
            <Typography id="modal-modal-description" >
            <div className="botonesdecambiso">
            <a class="waves-effect waves-light btn" onClick={wichone}><i class="material-icons">chevron_left</i></a>
            <a class="waves-effect waves-light btn" id="botoncambio2" onClick={wichone2}>Por Monto Fijo</a>
            </div>
            
            <select className="browser-default" id="selectconsorcio7asd" ref={valorcons} onClick={getConsorcio} onChange={getUnit}> 
            <option value="" disabled selected >
            CONSORCIOS
            </option>
            {consorcios.map((option) => (
            <option value={option.id} >{option.name}</option>
            ))}
            </select>

            <div class="input-field col s10" id="periodoaliq2a">
            
            <DatePicker dateFormat="yyyy/MM/dd" preventOpenOnFocus={true} selected={datee} onChange={date => setDatee(date)} />
            <p className="fechaactual">Periodo a Liq.</p>
            </div>

            
        

            </Typography>
            <>
            <TableContainer className="container" component={Paper} >
        <Table className={classes.table} aria-label="simple table">
        <TableHead className="tablehead">
        <StyledTableRow >
            <StyledTableCell id="FilaPrincipal" align="left">Coeficiente</StyledTableCell>
            <StyledTableCell id="FilaPrincipal" align="left">Importe</StyledTableCell>
            
        </StyledTableRow>
        </TableHead>
        <TableBody className="tablebody" >
        {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (<>

                <StyledTableRow>

                <StyledTableCell align="left" style={{borderBottom:"none"}}>
                {row.coeficiente}
                </StyledTableCell>
                <StyledTableCell align="left" style={{borderBottom:"none"}}>
                {row.importe}
                </StyledTableCell>
                



                </StyledTableRow>
                
</>
            ))}
            {emptyRows > 0 && (
            <StyledTableRow style={{ height: 53 * emptyRows }}>
            <StyledTableCell id="footer" colSpan={6} />
            </StyledTableRow>
            )}
        </TableBody>
        </Table>
        <TablePagination 
        rowsPerPageOptions={[4]}
        component="div"
        count={rows.length}
        rowsPerPage={5}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        
    </TableContainer>
    <a class="waves-effect waves-light btn" id="botonImprimir">Imprimir</a>
    <a class="waves-effect waves-light btn" id="botonLiquidar">Liquidar</a>
            </></>
            }
            
        </Box>
        </Modal>
    </div>  
        </>
    );
}

export default LiquidacionesPGPM;