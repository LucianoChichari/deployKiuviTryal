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
import { set } from "react-hook-form";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const baseURL = "http://localhost:4000/consortiums"

function AltaGastos(props) {
    const [total, setTotal] = useState()
    const [periodoquery, setPeriodoquery] = useState('')
    const [linkunidad, setlinkunidad] = useState('')
    const [consorcioquery, setconsorcioquery] = useState('')
    const [linkconcepto, setLinkconcepto] = useState('')
    const [checkedOne, setCheckedOne] = React.useState(false);

    const consortiumhandle = () => {
        console.log("CONSORTIUM HANDLE", valorcons.current.value)
        if(checkedOne){
            setconsorcioquery(`&consortium=${valorcons.current.value}`)
        }else{
            setconsorcioquery('')
        }
    }
    const handleChange = () => {
        console.log("ONCLICK CONSORCIO",valunidad.current.value)
        setCheckedOne(!checkedOne);
        setCheckedOne2(false);
        setConsulta([])
        setlinkunidad('')
        
    };

    const [checkedOne2, setCheckedOne2] = React.useState(false);
    const unithandle = () => {
            console.log("UNIT HANDLE", valorcons.current.value)
            setlinkunidad(`&unit=${valunidad.current.value}`)
    }
    const conceptohandle = () => {
        console.log("Concepto HANDLE", valconcepto.current.value)
        setLinkconcepto(`&concept=${valconcepto.current.value}`)
    }
    const handleChange2 = () => {
        console.log("ONCLICK UNIDAD", valorcons.current.value)
        setCheckedOne2(!checkedOne2);
        setCheckedOne(false)
        setConsulta([])
        setconsorcioquery('')
        
    };

    const [checkedOne3, setCheckedOne3] = React.useState(false);
    const handleChange3 = () => {
        setCheckedOne3(!checkedOne3);
        if(checkedOne3 === true){
            setLinkconcepto(`&concept=${valconcepto.current.value}`)
        }else{
            setLinkconcepto('')
        }
    };
    
    const [checkedOne4, setCheckedOne4] = React.useState(false);
    const fechahandle = (date) => {
        if(checkedOne3 === false){
            valconcepto.current.value = "";
            setLinkconcepto('')
        }
        mockdate.setDate(date.getDate());
        if(checkedOne4 === true){
            setDate(date.setUTCHours(0,0,0,0))
            console.log(`&outlayPeriod=${date.toISOString()}`)
            setPeriodoquery(`&outlayPeriod=${date.toISOString()}`)
            }else{
                setDate(date.setUTCHours(0,0,0,0))
                setPeriodoquery('')
            }
    }
    const handleChange4 = () => {
        
        if(checkedOne3 === false){
            valconcepto.current.value = ""
            setLinkconcepto('')
        }
        setCheckedOne4(!checkedOne4);
    };
    const columns = [
        { field: 'date', headerName: 'Fecha', width: 100 },
        { field: 'date', headerName: 'Periodo', width: 130 },
        { field: 'unit', headerName: 'Unidad', width: 130 },
        { field: 'concept', headerName: 'Concepto', width: 130 },
        { field: 'description', headerName: 'Descripcion', width: 130 },
        { field: 'importe', headerName: 'Importe', width: 70 }
    ];


    function createData(fecha, periodo, unidad, concepto, descripcion, importe) {
        return { fecha, periodo, unidad, concepto, descripcion, importe };
    }

    const rows = [
        createData("01/01/2021", "01/01/2021","cell", "cell", "cell", 100),
        createData("01/01/2021", "01/01/2021","cell", "cell", "cell", 100),
        createData("01/01/2021", "01/01/2021","cell", "cell", "cell", 100),
        createData("01/01/2021", "01/01/2021","cell", "cell", "cell", 100),
        createData("01/01/2021", "01/01/2021","cell", "cell", "cell", 100),
        createData("01/01/2021", "01/01/2021","cell", "cell", "cell", 100),
        createData("01/01/2021", "01/01/2021","cell", "cell", "cell", 100),
        createData("01/01/2021", "01/01/2021","cell", "cell", "cell", 100)
    ];

    const useStyles = makeStyles({
        table: {
        minWidth: 650
        }
    });
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
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
    const anulartodosloscheck = () =>{
        setCheckedOne(false)
        setCheckedOne2(false)
        setCheckedOne3(false)
        setCheckedOne4(false)
    }
    const openModal = () =>{
        anulartodosloscheck()
        setShowModal(prev => !prev)
        console.log(showModal)
    }
    const pruebaonclick = () =>{
        setShowModal(true)
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1020,
        bgcolor: '#E3DCCA',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const valorcons = useRef(null)
    const [pickone, setPickone] = useState(0)
    const [post, setPost] = useState([])
    const [consorcios, setConsorcios] = useState([]);
    const [unidades, setUnidades] = useState([]);
    const [showModal, setShowModal] = useState(false)

    const valunidad = useRef(null)
    const valconcepto = useRef(null)
    const valperiodo = useRef(null)
    const localidad = useRef(null)
    const cuit = useRef(null)
    const province = useRef(null)
    const chosenoption = useRef(null)
    const valorunit = useRef(null)

    const consorciounidad = () =>{
        setPickone(chosenoption.current.value)
        console.log("PICKONE",setPickone)
    }

    function getConsorcio(){
        if(checkedOne3 === false){
            valconcepto.current.value = "";
            setLinkconcepto('')
        }
        if(checkedOne4 === false){
            setPeriodoquery('')
        }
        valunidad.current.value = "";
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
    const [conceptos, setConceptos] = useState([])
    function getConceptos(){
        if(checkedOne === false && checkedOne2 === false){
            valorcons.current.value = "";
            valunidad.current.value = "";
            setconsorcioquery('');
            setlinkunidad('');
        }
        if(checkedOne4 === false){
            setPeriodoquery('')
        }
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
            .then(result => setConceptos(result))
            .catch(error => console.log('error', error));

        
    }
    const [id1, setid1] = useState()
    const [id2, setid2] = useState()

    function getUnit (){
        if(checkedOne3 === false){
            valconcepto.current.value = "";
            setLinkconcepto('')
        }
        if(checkedOne4 === false){
            setPeriodoquery('')
        }
        valorcons.current.value = "";
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user.token}`)
        
    

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    
    fetch("http://localhost:4000/units", requestOptions)
        .then(response => response.json())
        .then(result => setUnidades(result))
        .catch(error => console.log('error', error));
        
    }
    
    const [date, setDate] = useState(new Date());
    const [mockdate, setMockdate] = useState(new Date());
    const [option, setOption] = useState(true)

    const wichone = () =>{
        setOption(true)
        console.log("CAMBIO DE FORM", option)
    }
    const wichone2 = () =>{
        setOption(false)
        console.log("CAMBIO DE FORM", option)
}

    function reload () {
        window.location.reload()
    }

    function anulartodo(){
        valconcepto.current.value = null
        valunidad.current.value = null
        setDate(null)
        setPeriodoquery('')
        setlinkunidad('') 
    }

    function anularunidad(){
        setlinkunidad('')
        valunidad.current.value = null
    }

    function anularconcepto(){
        valconcepto.current.value = null;
    }

    function anularperiodo(){
        setPeriodoquery('')
        setDate(null)
    }
    
    function setearperiodo(date){
        setDate(date)
        setPeriodoquery(`&period=${date.toISOString().split('T')[0]}`)
    }

    function setunidad(){
        setlinkunidad(`&unit=${valunidad.current.value}`)
    }
    function setconcepto(){
        setLinkconcepto(`&concept=${valconcepto.current.value}`)
    }
    function setconsorcio(){
        setconsorcioquery(`&consortium=${valorcons.current.value}`)
    }
    const [consulta, setConsulta] = useState([])

    function obtaintotal(){
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        let acum = 0
        consulta.map((option) => (
            setTotal(acum = acum + option.amount)
            ))
        console.log(total)
    }

    function onclickconsultar (){
        console.log("LINKUNIDAD", linkunidad )
        let linkeo = `/outlays?${consorcioquery}${periodoquery}${linkunidad}${linkconcepto}`

        console.log("LINKEO",linkeo)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user.token}`)

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        
        fetch(`http://localhost:4000${linkeo}`, requestOptions)
            .then(response => response.json())
            .then(result => {
            setConsulta(result)
                console.log("RESULT",result)
            })
            .catch(error => console.log('error', error));

    
    
    
    }
        
    return (
        
        <>
        <div>
        <li><a class="prueba sidenav-close" onClick={openModal} style={{cursor:'pointer'}}> Consulta de Gastos <i class="material-icons">keyboard_arrow_right</i></a></li>
        <Modal
        open={showModal}
        onClose={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box  sx={style}>
        
            <>
            <Typography id="modal-modal-description" >
            
            
            
            <h6 className="tituloconsuklta" ><i class="material-icons" id="">class</i>
            CONSULTA DE GASTOS </h6>
            <div className="margen">
            <p id="botondecambio19">
            <label>
            <input type="checkbox" class="filled-in" value={checkedOne} checked={checkedOne} onClick={handleChange} />
            <span>CONSORCIO</span>
            </label>
            </p>
            <p id="botondecambio20">
            <label>
            <input type="checkbox" class="filled-in" value={checkedOne2} checked={checkedOne2} onClick={handleChange2}/>
            <span>UNIDAD</span>
            </label>
            </p>
            <p id="botondecambio21">
            <label>
            <input type="checkbox" class="filled-in" value={checkedOne3} onClick={handleChange3} />
            <span>CONCEPTO</span>
            </label>
            </p>
            <p id="botondecambio22">
            <label>
            <input type="checkbox" class="filled-in" value={checkedOne4} onClick={handleChange4} />
            <span>PERIODO</span>
            </label>
            </p>
            </div>
            <div className="margen2">

            {checkedOne ? 
            <select className="browser-default"  id="selectconsorcio77" value={id1} onChange={consortiumhandle} ref={valorcons}  onClick={getConsorcio}>
            <option value="" disabled selected>
            CONSORCIO
            </option>
            {consorcios.map((option) => (
            <option value={option.id} >{option.name}</option>
            ))}
            </select>
            :
            <select className="browser-default"  id="selectconsorcio77" value={id1} onChange={consortiumhandle} ref={valorcons}  onClick={getConsorcio} disabled>
            <option value="" disabled selected>
            CONSORCIO
            </option>
            {consorcios.map((option) => (
            <option value={option.id} >{option.name}</option>
            ))}
            </select>
            }
            
            {checkedOne2 ? 
            <select className="browser-default"  id="selectconsorcio78"   onChange={unithandle} ref={valunidad} onClick={getUnit}>
            <option value="" disabled selected>
            UNIDAD
            </option>
            {unidades.map((option) => (
            <option value={option.id} >{option.name}</option>
            ))}
            </select>
            :
            <select className="browser-default"  id="selectconsorcio78"   onChange={unithandle} ref={valunidad} onClick={getUnit} disabled>
            <option value="" disabled selected>
            UNIDAD
            </option>
            {unidades.map((option) => (
            <option value={option.id} >{option.name}</option>
            ))}
            </select>
            }
            
            
            {checkedOne3 ? 
            <select className="browser-default"  id="selectconsorcio78" value={id1} onChange={conceptohandle} ref={valconcepto}  onClick={getConceptos}>
            <option value="" disabled selected>
            CONCEPTO
            </option>
            {conceptos.map((option) => (
            <option value={option.id} >{option.name}</option>
            ))}
            </select>
            :
            <select className="browser-default"  id="selectconsorcio78" value={id1} onChange={handleChange3} ref={valconcepto}  onClick={getConceptos} disabled>
            <option value="" disabled selected>
            CONCEPTO
            </option>
            {conceptos.map((option) => (
            <option value={option.id} >{option.name}</option>
            ))}
            </select>
            }
            
            
            {checkedOne4 ? 
            <div class="input-field col s10" id="periodo">
            <DatePicker dateFormat="yyyy/MM/dd" preventOpenOnFocus={true} selected={mockdate} onChange={date => fechahandle(date)} />
            </div>
            :
            <div class="input-field col s10" id="periodo">
            <DatePicker dateFormat="yyyy/MM/dd" preventOpenOnFocus={true} selected={date} onChange={date => fechahandle(date)} disabled/>
            </div>
            }
            </div>
            
            
            
            
            </Typography>
            </>
            <hr width="680px" size="8" align="center" id="separador22"/>
            
            <TableContainer className="container" component={Paper} >
        <Table className={classes.table} aria-label="simple table">
        <TableHead className="tablehead">
        <StyledTableRow >
            <StyledTableCell id="FilaPrincipal" align="left">Fecha</StyledTableCell>
            <StyledTableCell id="FilaPrincipal" align="left">Periodo</StyledTableCell>
            <StyledTableCell id="FilaPrincipal" align="left">Concepto</StyledTableCell>
            <StyledTableCell id="FilaPrincipal" align="left">Descripcion</StyledTableCell>
            <StyledTableCell id="FilaPrincipal" align="left">Importe</StyledTableCell>
            <StyledTableCell id="FilaPrincipal" align="left">Nro Comp</StyledTableCell>
        </StyledTableRow>
        </TableHead>
        <TableBody className="tablebody" >
        {consulta
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (<>

                <StyledTableRow>

                <StyledTableCell align="left" style={{borderBottom:"none"}}>
                {row.date.substring(0,10)}
                </StyledTableCell>
                <StyledTableCell align="left" style={{borderBottom:"none"}}>
                {row.outlayPeriod.substring(0,10)}
                </StyledTableCell>
                <StyledTableCell align="left" style={{borderBottom:"none"}}>
                {row.concept.name}
                </StyledTableCell>
                <StyledTableCell align="left" style={{borderBottom:"none"}}>
                {row.description}
                </StyledTableCell>
                <StyledTableCell align="left" style={{borderBottom:"none"}}>
                {row.amount}
                </StyledTableCell>
                <StyledTableCell align="left" style={{borderBottom:"none"}}>
                {row.voucherNumber}
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
        rowsPerPageOptions={[5]}
        component="div"
        count={rows.length}
        rowsPerPage={5}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        
    </TableContainer>
    <h6 id="totalprec">Total: {total}</h6>
        <a id="botonguardado12"class="btn waves-effect waves-light" onClick={onclickconsultar}>
            FILTRAR
            </a>
            <a id="botonguardado127"class="btn waves-effect waves-light" onClick={obtaintotal}>
            CALCULAR TOTAL
            </a>
            </Box>
        </Modal>
    </div>  
        </>
    );
}

export default AltaGastos;