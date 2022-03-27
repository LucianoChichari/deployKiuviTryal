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
import { useState, useEffect } from "react";
import { styled } from "@material-ui/core";
import { tableCellClasses } from "@mui/material/TableCell";
import './style.css'
import 'materialize-css'
import AddUnit from "../addunit/addUnit";
import {Dropdown, Divider} from 'react-materialize'
import {
    withRouter
} from 'react-router-dom';
import { useHistory, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authAtom } from "../../_state/Auth";
function GastosUnidad(props) {
    
    let user = window.sessionStorage.getItem("user")
    user = JSON.parse(user)

    const auth = useRecoilState(authAtom);
    const useStyles = makeStyles({
        table: {
        minWidth: 650
        }
    });

    const [items, setItems] = useState([]);
    const[datoBusqueda, setdatoBusqueda] = useState([])
    const[buscar, setBuscar] = useState('');

    const {id} = useParams();
    const{id2} = useParams();
    const [reload, setreload] = useState(items)
    useEffect(() => {
        setreload(prevreload => !prevreload)
    }, [])

    
    
    useEffect(() =>{
        
        history.listen((location, action) => {
            console.log("cambio ruta");
            window.location.reload();
        })

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user.token}`)
        console.log(user.token)
        
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        
        fetch(`http://localhost:4000/consortiums/${id}/units/${id2}/outlays`, requestOptions)
            .then(response => response.json())
            .then(result => setItems(result.body))
            .catch(error => console.log('error', error));
    
            // if (items == []) {
            //     console.log("RELOAD",reload)
            //     window.location.reload();
                
            // }
            // if (reload !== items){
            //     setreload(items)
            //     window.location.reload();
            //     console.log("RELOAD AND ITEMS", reload, items)
            // }
        
    }, []);

    
    
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

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage);

    const display = (e) => {
        console.log(e.target.id)
    }
    
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
        
        },
        [`&.${tableCellClasses.body}`]: {
        fontSize: 15,
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

    
    const handleSearch = () =>{
        console.log(buscar)
        if (buscar !==''){
        const newData = items.filter(function(item){
            return items.test2 === (buscar ===''? items.test2 : buscar);
            });
            setdatoBusqueda(newData)
        }
        else{
            setdatoBusqueda(items)
        }
        console.log(datoBusqueda)
    }
    // const loadedUnits = () =>{
    //  console.log("loadedUnits")   
    // }
    
    // const emptyUnits = () => {
    //     console.log("emptyUnits")
    // }
    
  

    const history = useHistory();
    const routeChange = () =>{ 
        let path = `/Propietarios`; 
        history.push(path);
    }

    const history2= useHistory();
    const routeChange2 = () =>{ 
        let path = `/Inquilinos`; 
        history2.push(path);
    }
return (
<>
    
<div className='SB'>

    <a class="btn-floating btn-small waves-effect waves-light " ><i class="material-icons" id="arrow" onClick={()=>handleSearch()} >search</i></a>
    
    <input type="text" placeholder="Buscar..." style={{ width: "200px" }} onChange={(e)=> setBuscar(e.target.value)}/>

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
            <StyledTableCell align="right">Id</StyledTableCell>
            <StyledTableCell align="right">Denominacion</StyledTableCell>
           
            <StyledTableCell align="right">Eliminar</StyledTableCell>
        </StyledTableRow>
        </TableHead>
        <TableBody className="tablebody">
        {items
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
                <StyledTableRow key={row.name}>
                <StyledTableCell align="right" style={{borderBottom:"none"}}>{row.id}</StyledTableCell>

                <StyledTableCell align="right" style={{borderBottom:"none"}}>
                {row.concept.name}
                </StyledTableCell>


                <StyledTableCell id="contenido" align="right" style={{borderBottom:"none"}}>                               
                    <a class="btn-floating btn-large waves-effect waves-light red" ><i class="material-icons" onClick={display} id={row.test1}>delete</i></a>
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
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        />
</TableContainer>
</>
);}

export default GastosUnidad;