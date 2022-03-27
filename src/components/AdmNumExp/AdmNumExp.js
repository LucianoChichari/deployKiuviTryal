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
import './AdmNumExp.css'
import 'materialize-css'
import M from 'materialize-css/dist/js/materialize.min.js'
import { Row } from "react-materialize";
import { useHistory } from "react-router-dom";
import AddNewConsortium from "../addconsortium/addConsortium";
import {Dropdown, Button, Divider, NavItem, Navba} from 'react-materialize'
import {Link} from 'react-router-dom'
import { useRecoilState } from "recoil";
import { authAtom } from "../../_state/Auth";
import { set } from "react-hook-form";
function AdmNumExp(props) {
    const useStyles = makeStyles({
        table: {
        minWidth: 650
        }
    });
    const [auth, setAuth] = useRecoilState(authAtom);
    const [items, setItems] = useState([]);
    const[datoBusqueda, setdatoBusqueda] = useState([])
    const[buscar, setBuscar] = useState('');

    useEffect(() =>{
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${auth.token}`)

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        
        fetch("http://localhost:4000/consortiums", requestOptions)
            .then(response => response.json())
            .then(result => {
                setItems(result)
                setdatoBusqueda(result)
            })
            .catch(error => console.log('error', error));
    }, []);

    useEffect(()=>{
        console.log(items)
        console.log("TOKEN",auth.token)
    },[items])


    function createData(test1, test2, test3, test4, test5) {
        return { test1, test2, test3, test4, test5 };
    }

    const rows = [
        createData(0, 159, 6.0, 24, 4.0),
        createData(1, 159, 6.0, 24, 4.0),
        createData(2, 237, 9.0, 37, 4.3),
        createData(3, 262, 16.0, 24, 6.0),
        createData(4, 305, 3.7, 67, 4.3),
        createData(5, 356, 16.0, 49, 3.9),
        createData(6, 356, 16.0, 49, 3.9),
        createData(7, 356, 16.0, 49, 3.9),
        createData(8, 159, 6.0, 24, 4.0),
        createData(9, 237, 9.0, 37, 4.3),
        createData(10, 262, 16.0, 24, 6.0),
    ];

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
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const display = (e) => {
        console.log(e.target.id)
        console.log(items[e.target.id]) 
    }
    
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        
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
    const history = useHistory();
    const routeChange = () =>{
        let path = `/Unidades`; 
        history.push(path);
    }

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

    return (
    <>

    

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
        <StyledTableRow >
            <StyledTableCell id="FilaPrincipal" >Consorcio</StyledTableCell>
            <StyledTableCell id="FilaPrincipal" align="left">Ultima Expensa</StyledTableCell>
            <StyledTableCell id="FilaPrincipal" align="left">Editar</StyledTableCell>
        </StyledTableRow>
        </TableHead>
        <TableBody className="tablebody">
        {datoBusqueda
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (<>

                <StyledTableRow key={row.name}>
                

                <StyledTableCell align="left" style={{borderBottom:"none"}}>
                {row.name}
                </StyledTableCell>

                <StyledTableCell id="contenido" align="left" style={{borderBottom:"none"}}>0</StyledTableCell>

                <StyledTableCell id="contenido" align="left" style={{borderBottom:"none"}}>                               
                    <a class="btn-floating btn-large waves-effect waves-light transparent" ><i class="material-icons" onClick={display} id={row.test1}>create</i></a>
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
    );
}

export default AdmNumExp;