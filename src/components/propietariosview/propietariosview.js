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
import { useState} from "react";
import { styled } from "@material-ui/core";
import { tableCellClasses } from "@mui/material/TableCell";
import './style.css'
import 'materialize-css'
import AddNewPropietario from "../addnewpropietario/Addnewpropietario";
import {Dropdown, Divider, NavItem} from 'react-materialize'
function PropietarioView(props) {
    const useStyles = makeStyles({
        table: {
        minWidth: 650
        }
    });
    const [items, setItems] = useState([]);
    const[datoBusqueda, setdatoBusqueda] = useState([])
    const[buscar, setBuscar] = useState('');
    
    React.useEffect(()=>{
        const rows = [
            {test1: "Propietario " +0, test2:"Propietario1",test3:"Propietario", test4:"Propietario"},
            {test1: "Propietario " +1,test2:"Propietario2",test3:"Propietario", test4:"Propietario"},
            {test1: "Propietario " +2,test2:"Propietario3",test3:"Propietario", test4:"Propietario"},
            {test1: "Propietario " +3,test2:"Propietario4",test3:"Propietario", test4:"Propietario"},
            {test1: "Propietario " +4,test2:"Propietario5",test3:"Propietario", test4:"Propietario"},
            {test1: "Propietario " +5,test2: "Propietario",test3:"Propietario",test4: "Propietario"},
            {test1: "Propietario " +6,test2: "Propietario",test3:"Propietario",test4: "Propietario"},
            {test1: "Propietario " +7, test2:"Propietario",test3:"Propietario", test4:"Propietario"},
            {test1: "Propietario " +8, test2:"Propietario",test3:"Propietario", test4:"Propietario"},
            {test1: "Propietario " +9, test2:"Propietario",test3:"Propietario", test4:"Propietario"},
            {test1: "Propietario " +10, test2:"Propietario",test3:"Propietario", test4:"Propietario"}
        ];
        setItems(rows)
        setdatoBusqueda(rows)
    },[])
    
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

    
    const handleSearch = () =>{
        console.log(buscar)
        if (buscar !==''){
        const newData = items.filter(function(items){
            return items.test2 === (buscar ===''? items.test2 : buscar);
            });
            setdatoBusqueda(newData)
        }
        else{
            setdatoBusqueda(items)
        }
    }
    const loadedUnits = () =>{
    console.log("loadedUnits")   
    }
    
    const emptyUnits = () => {
        console.log("emptyUnits")
    }
    



return (
<>
<AddNewPropietario/>
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
            <StyledTableCell >Head</StyledTableCell>
            <StyledTableCell align="right">Head</StyledTableCell>
            <StyledTableCell align="right">Head</StyledTableCell>
            <StyledTableCell align="right">Head</StyledTableCell>
        </StyledTableRow>
        </TableHead>
        <TableBody className="tablebody">
        {datoBusqueda
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
            <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                {row.test1}
                </StyledTableCell>
                <StyledTableCell align="right" style={{borderBottom:"none"}}>{row.test2}</StyledTableCell>
                <StyledTableCell align="right" style={{borderBottom:"none"}}>{row.test3}</StyledTableCell>
                <StyledTableCell align="right" style={{borderBottom:"none"}}>{row.test4}</StyledTableCell>
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

export default PropietarioView;