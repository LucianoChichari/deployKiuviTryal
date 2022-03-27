import React from "react";
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
import Typography from "@material-ui/core/Typography";
import { useState, useEffect } from "react";
import { styled } from "@material-ui/core";
import { tableCellClasses } from "@mui/material/TableCell";
import './style.css'
import 'materialize-css'
import M from 'materialize-css/dist/js/materialize.min.js'
import { Row } from "react-materialize";
import AddNewPropietario from "../addnewpropietario/Addnewpropietario";
import {Dropdown, Button, Divider, NavItem, Navba} from 'react-materialize'
import { render } from "@testing-library/react";
import AddNewInquilino from "../addnewinquilino/Addnewinquilino";
import { useHistory, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authAtom } from "../../_state/Auth";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
function InquilinosView(props) {
    const [showModal, setShowModal] = useState(false)
    const openModal = () =>{
        setShowModal(prev => !prev)
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#E3DCCA',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    let user = window.sessionStorage.getItem("user")
    user = JSON.parse(user)
    const useStyles = makeStyles({
        table: {
        minWidth: 650
        }
    });
    const {id} = useParams();
    const {idnh} = useParams();
    const [items, setItems] = useState([]);
    const[datoBusqueda, setdatoBusqueda] = useState([])
    const[buscar, setBuscar] = useState('');
    
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

    fetch(`http://localhost:4000/consortiums/${id}/units/${idnh}/roomers`, requestOptions)
    .then(response => response.json())
    .then(result => {
        setItems(result.body)
        setdatoBusqueda(result.body)
    })
    .catch(error => console.log('error', error));
    }, []);

    useEffect(()=>{
        console.log("CONSOLE LOG DE ITEMS",items)
    },[items])
    
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

    const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage);

    const display = (e) => {
        console.log(e.target.id)
    }
    
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
        
        },
        [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        },
    }));
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
        border: 0,
        },
    }));

    
    const handleSearch = (event) =>{
        let value = event.target.value.toLowerCase();
        let result = [];
        console.log("VALUE",value);
        console.log(items[0].name)
        result = items.filter((data) => {
            console.log(data.name)
            let lowecase = [];
            lowecase = data.name.toLowerCase(); 
        return lowecase.search(value) != -1;
        });
        console.log(result)
        setdatoBusqueda(result)
    }

    const loadedUnits = () =>{
    console.log("loadedUnits")   
    }
    
    const emptyUnits = () => {
        console.log("emptyUnits")
    }
    

    const [option, setOption] = useState(true)

    const wichone = () =>{
        setOption(true)
        console.log("CAMBIO DE FORM", option)
    }
    const wichone2 = () =>{
        setOption(false)
        console.log("CAMBIO DE FORM", option)
    }

return (
<>
<AddNewInquilino/>
<div className='SB'>

    <input type="text" placeholder="Buscar por Denominacion" style={{ width: "200px" }} onChange={(event)=>handleSearch(event)}/>

    <Dropdown
    id="Dropdown_8"
    options={{
    alignment: 'left',
    autoTrigger: true,
    closeOnClick: true,
    constrainWidth: true,
    container: null,
    coverTrigger: false,
    hover: false,
    inDuration: 150,
    onCloseEnd: null,
    onCloseStart: null,
    onOpenEnd: null,
    onOpenStart: null,
    outDuration: 250
    }}
    trigger={<a class="btn-floating btn-large waves-effect waves-light red" ><i class="material-icons" id="arrow">arrow_downward</i></a>}>
    
    <a >
    Cargados
    </a>
    <Divider />
    <a >
    Vacios
    </a>
    </Dropdown>
</div>


        <TableContainer className="container" component={Paper} >
        <Table className={classes.table} aria-label="simple table">
        
        <TableHead className="tablehead">
        <StyledTableRow>
            <StyledTableCell >Nombre</StyledTableCell>
            <StyledTableCell align="right">Apellido</StyledTableCell>
            <StyledTableCell align="right">Direccion</StyledTableCell>
            <StyledTableCell align="right">CUIT</StyledTableCell>
            <StyledTableCell align="right">EDITAR</StyledTableCell>
            <StyledTableCell align="right">ELIMINAR</StyledTableCell>
        </StyledTableRow>
        </TableHead>

        <TableBody className="tablebody">
        {datoBusqueda
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
            <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                {row.name}
                </StyledTableCell>
                <StyledTableCell align="right" style={{borderBottom:"none"}}>{row.lastName}</StyledTableCell>
                <StyledTableCell align="right" style={{borderBottom:"none"}}>{row.address}</StyledTableCell>
                <StyledTableCell align="right" style={{borderBottom:"none"}}>{row.cuit}</StyledTableCell>
                <StyledTableCell align="right" style={{borderBottom:"none"}}>
                    <a class="btn-floating btn-large waves-effect waves-light transparent" ><i class="material-icons"  id={row.id}>create</i></a>
                    </StyledTableCell>
                    <StyledTableCell align="right" style={{borderBottom:"none"}}>
                    <a class="btn-floating btn-large waves-effect waves-light red" ><i class="material-icons"  id={row.id}>delete</i></a>
                    </StyledTableCell>
            </StyledTableRow>
            ))}
            {emptyRows > 0 && (
            <StyledTableRow style={{ height: 53 * emptyRows }}>
            <StyledTableCell colSpan={6} />
            </StyledTableRow>
            )}
        </TableBody>
        </Table>
        <TablePagination
        rowsPerPageOptions={[10,5]}
        component="div"
        count={datoBusqueda.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        />
</TableContainer>
</>
);}

export default InquilinosView;