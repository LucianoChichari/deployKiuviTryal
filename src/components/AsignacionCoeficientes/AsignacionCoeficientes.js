import React from "react";
import './AsignacionCoeficientes.css'
import styled from "styled-components"
import { useState, useRef } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import 'materialize-css'
import "react-datepicker/dist/react-datepicker.css";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import { tableCellClasses } from "@mui/material/TableCell";
import zIndex from "@material-ui/core/styles/zIndex";


function AsignacionCoeficientes(props) {
    
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

    const [unidadesDeConsorcio, setUnidadesDeConsorcio] = useState([]);
    const [consorcios, setConsorcios] = useState([]);
    const [coeficientes, setCoeficientes] = useState([]);
    const [showModal, setShowModal] = useState(false)
    //ARRAYS PARA LABURAR
    function getConsorcio(){
        var myHeaders = new Headers();
        console.log("USERATOM",user.token)
        myHeaders.append("Authorization", `Bearer ${user.token}`)
        
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(`http://localhost:4000/consortiums`, requestOptions)
        .then(response => response.json())
        .then(result => setConsorcios(result))
        .catch(error => console.log('error', error));
    }
    function getConsorcioUnits(){
        var myHeaders = new Headers();
        console.log("USERATOM",user.token)
        myHeaders.append("Authorization", `Bearer ${user.token}`)
        
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(`http://localhost:4000/consortiums/${consID.current.value}/units`, requestOptions)
        .then(response => response.json())
        .then(result => setUnidadesDeConsorcio(result.body))
        .catch(error => console.log('error', error));
    }
    function getCoeficients(){
        var myHeaders = new Headers();
        console.log("USERATOM",user.token)
        myHeaders.append("Authorization", `Bearer ${user.token}`)
        
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("http://localhost:4000/coefficients", requestOptions)
        .then(response => response.json())
        .then(result => setCoeficientes(result))
        .catch(error => console.log('error', error));
    }
    const consID = useRef(null)
    const coefID = useRef(null)
    //LOGICA DEL COMPONENTE DE MIERDA QUE QUEIRE QUE HAGA SENNA PARA ESTE PROYECTO DE MIERDA PARA ESTE VIEJO DE MIERDA
    const [arrayCoeficientes, setArrayCoeficientes] = useState([]);
    const [auxofaux, setAuxofaux] = useState([])
    const [auxState, setAuxState] = useState([]);
    function getCoeficientsOfUnitsArray(){
        var myHeaders = new Headers();
        console.log("USERATOM",user.token)
        myHeaders.append("Authorization", `Bearer ${user.token}`)
        
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`http://localhost:4000/consortiums/${consID.current.value}/percentajes/${coefID.current.value}`, requestOptions)
        .then(response => response.json())
        .then(result => setAuxofaux(result.body))
        .catch(error => console.log('error', error));
        
    }
    //USE STATE Y FETCH PARA OBTENER EL ARRAY DE IDCONSORTIUMS IDCOEFICIENTS
    function funcionCondicionalParaMapeoyUpdate(){
        if (auxofaux.length === 0) {
            var auxarray = [];
            console.log(unidadesDeConsorcio)
            unidadesDeConsorcio.forEach(coef => {
                var aux = {
                    
                    "unit": {"id": coef.id},
                    "percentaje": 0,
                    "coefficient": {"id": coefID.current.value}
                
                }
                auxarray.push(aux)
            });
            setTodos(auxarray)
            setAuxState(auxarray)
            console.log('SI ES VACIO',auxState)
            //ver que onda si hago fetch aca y en el onclick consumo ese fetch
                // var myHeaders = new Headers();
                // console.log("USERATOM",user.token)
                // myHeaders.append("Authorization", `Bearer ${user.token}`)
                // myHeaders.append("Content-Type", "application/json");
                
                // var raw = JSON.stringify(auxarray)

                // var requestOptions = {
                //     method: 'POST',
                //     headers: myHeaders,
                //     body: raw,
                //     redirect: 'follow'
                // };

                // fetch(`http://localhost:4000/consortiums/${consID.current.value}/percentajes`, requestOptions)
                // .then(response => response.text())
                // .then(result => console.log(result))
                // .catch(error => console.log('error', error));
        } else {
            setAuxState(auxofaux)
            setTodos(auxofaux)
            console.log('SI TIENE INFO',auxofaux)
        }
        
    }

    function loadNewValueOfCoef(){
        //ver que onda si hago fetch aca y en el onclick consumo ese fetch
                var myHeaders = new Headers();
                console.log("USERATOM",user.token)
                myHeaders.append("Authorization", `Bearer ${user.token}`)
                myHeaders.append("Content-Type", "application/json");
                
                var raw = JSON.stringify(totodos)

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch(`http://localhost:4000/consortiums/${consID.current.value}/percentajes`, requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
    }

    //IF ESE STATE ESTA VACIO, LLAMAME A LA FUNCION GET UNITS OF CONSORCIO USANDO EL VALOR SELECCIONADO EN CONSORTIUM ID

    //TRAEME ESOS VALORES, Y HAGO EL FOR FLASHERO PARA ARMAR EL ARRAY NUEVO DEPENDIENDO DE EL .LENGHT DE EL ARRAY DE UNIDADES

    //SETEAME LO QUE SE VA A MAPEAR CON ESOS VALORES GENERADOS EN EL FOR

    //UNA VEZ EL USUARIO MODIFIQUE ESOS VALORES A TRAVEZ DE EL INPUT, MANDAME ESTOS VALORES AL RAW JSON STRINGIFY, Y POSTEALOS EN EL BOTON LIQUIDAR

    // AHORA, SI ESE STATE TIENE INFO, TRAEME ESA INFO, MOSTRALA EN EL MAPEO, UNA VEZ MODIFICADA POR EL USER, MANDALA AL RAW JSON STRINGIFY, Y POSTEAR
    const [todos, setTodos] = useState([])
    const [totodos, setTotodos] = useState([])
    function updatearray(todo, index){
        var arrayauxiliardepost = todos;
        arrayauxiliardepost[index].percentaje = todo.target.value;
        console.log(arrayauxiliardepost)
        setTotodos(arrayauxiliardepost)
    }
    const handleUpdate = (todo, index) => {
        updatearray(todo, index);
    }
    
    return (
        <>
        <div>
        <li><a class="prueba" onClick={openModal} style={{cursor:'pointer'}}> Asignacion de Coef. <i class="material-icons">keyboard_arrow_right</i></a></li>
        <Modal
        open={showModal}
        onClose={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box  sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2"><i class="material-icons" id="">class</i>
            ASIGNACION DE COEFICIENTES<div class="input-field col s10" id="FechaAltaGastos">
            
            </div>
            </Typography>
            
            
            <Typography id="modal-modal-description">
            
            
            <select className="browser-default" id="selectconsorcio7asdAA" ref={consID} onClick={getConsorcio} onChange={getConsorcioUnits}> 
            <option value="" disabled selected >
            CONSORCIOS
            </option>
            {consorcios.map((option) => (
            <option value={option.id} >{option.name}</option>
            ))}
            </select>

            <select className="browser-default" id="selectconsorcio7asdAA" ref={coefID} onClick={getCoeficients} onChange={getCoeficientsOfUnitsArray}> 
            <option value="" disabled selected >
            COEFICIENTES
            </option>
            {coeficientes.map((option) => (
            <option value={option.id} >{option.name}</option>
            ))}
            </select>
            
            <a class="waves-effect waves-light btn"id="buscarCoeficientesButton" onClick={funcionCondicionalParaMapeoyUpdate}>Buscar</a>


            </Typography>
            
            <TableContainer className="container" component={Paper} >
            <div className="LAPUTAMADRE">
        <Table className={classes.table} aria-label="simple table">
        <TableHead className="tablehead">
        <StyledTableRow >
            <StyledTableCell id="FilaPrincipal" align="left">Coeficiente</StyledTableCell>
            <StyledTableCell id="FilaPrincipal" align="left">Importe</StyledTableCell>
            
        </StyledTableRow>
        </TableHead>
        
        <TableBody className="tablebody" >
        {auxState
            .map((row, index) => (<>

                <StyledTableRow>

                <StyledTableCell align="left" style={{borderBottom:"none"}}>
                {row.id}
                </StyledTableCell>
                <StyledTableCell align="left" style={{borderBottom:"none"}}>
                <input placeholder={row.percentaje}  onChange={(e) => handleUpdate(e,index)}></input> 
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
        
        </div>
    </TableContainer>
    
    <a class="waves-effect waves-light btn" id="botonLiquidar" onClick={loadNewValueOfCoef}>Liquidar</a>
            
            
        </Box>
        </Modal>
    </div>  
        </>
    );
}

export default AsignacionCoeficientes;