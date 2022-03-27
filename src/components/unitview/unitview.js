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
import { useState, useEffect, useRef } from "react";
import { styled } from "@material-ui/core";
import { tableCellClasses } from "@mui/material/TableCell";
import './styleunit.css'
import 'materialize-css'
import AddUnit from "../addunit/addUnit";
import {Dropdown, Divider} from 'react-materialize'
import { useHistory, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { propietId } from "../../_state/PropietId";
import { authAtom } from "../../_state/Auth";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Link} from 'react-router-dom'

function UnitView(props) {

    const propietarioid = useRef(null)


    const [showModal, setShowModal] = useState(false)
    const openModal = () =>{
        setShowModal(prev => !prev)
    }
    const auth = useRecoilState(authAtom);
    const [propid, setPropietId] = useRecoilState(propietId);
    const useStyles = makeStyles({
        table: {
        minWidth: 650
        }
    });

    const [items, setItems] = useState([]);
    const[datoBusqueda, setdatoBusqueda] = useState([])
    const[buscar, setBuscar] = useState('');
    const [testid, settestid] = useState()
    const {id} = useParams();
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
    useEffect(() =>{
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${auth[0].token}`)
        
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

        fetch(`http://localhost:4000/consortiums/${id}/units`, requestOptions)
        .then(response => response.json())
        .then(result => {
            setItems(result.body)
            setdatoBusqueda(result.body)
        }).catch(e=>{
            console.log(e)
        })
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
        let path = `/Propietarios`; 
        history.push(path);
    }

    const history2= useHistory();
    const routeChange2 = () =>{ 
        let path = `/Inquilinos`; 
        history2.push(path);
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
    

    const [option, setOption] = useState(true)

    const wichone = () =>{
        setOption(true)
        console.log("CAMBIO DE FORM", option)
    }
    const wichone2 = () =>{
        setOption(false)
        console.log("CAMBIO DE FORM", option)
    }
    const [propietarioslist, setPropietarioslist] = useState([])
    function getpropietarios(){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${auth[0].token}`)

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        
        fetch("http://localhost:4000/owners", requestOptions)
            .then(response => response.json())
            .then(result => setPropietarioslist(result))
            .catch(error => console.log('error', error));
    }
    const [unidadid, setunidadid] = useState()
    function asignarPropietario(rowid){
        
        console.log(propietarioid.current.value)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${auth[0].token}`)
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": propietarioid.current.value
        });
        
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        
        fetch(`http://localhost:4000/consortiums/${id}/units/${unidadid}/owner`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

            window.location.reload(false);
    }

    const name = useRef(null)
    const lastname = useRef(null)
    const address = useRef(null)
    const cuit = useRef(null)
    const province = useRef(null)
    const locality = useRef(null)
    const neighborhood = useRef(null)

    function postInquilinos(){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${auth[0].token}`)
        myHeaders.append("Content-Type", "application/json");

        
        var raw = JSON.stringify({
            "name": name.current.value,
            "lastName": lastname.current.value,
            "phoneNumber": cuit.current.value,
            "cuit": cuit.current.value,
            "address": address.current.value,
            "province": province.current.value,
            "locality": locality.current.value,
            "neighborhood": neighborhood.current.value
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(`http://localhost:4000/consortiums/${id}/units/${unidadid}/owner`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

        window.location.reload(false);
        }

    const [localidad, setLocalidades] = useState([])
        function getprovince(){
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${auth[0].token}`);
    
            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
    
            fetch("http://localhost:4000/provinces", requestOptions)
            .then(response => response.json())
            .then(result => setLocalidades(result))
            .catch(error => console.log('error', error));
        }
    
        useEffect(()=>{
            console.log("TOKEN",auth[0].token)
        },[localidad])
    
        const [cambio, setcambio] = useState()
        
        const [localidadelegida, setlocalidadelegida] = useState([])
        const [getbarrioelegido, setGetbarrio] = useState([])
        function getLocalidad(){
            
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${auth[0].token}`);
    
            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };
            
            fetch(`http://localhost:4000/provinces/${province.current.value}/localities`, requestOptions)
            .then(response => response.json())
            .then(result => setlocalidadelegida(result.body))
            .catch(error => console.log('error', error));
    
            
            
        }
        
        function getBarrio(){
            
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${auth[0].token}`);
    
            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };
    
            fetch(`http://localhost:4000/provinces/${province.current.value}/localities/${locality.current.value}/neighborhoods`, requestOptions)
            .then(response => response.json())
            .then(result => setGetbarrio(result.body))
            .catch(error => console.log('error', error));
    
        }

return (
<>
<AddUnit/>

<div>
        
        <Modal
        open={showModal}
        onClose={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box  sx={style}>
        {option? 
            <>
            <Typography id="modal-modal-title" variant="h6" component="h4"><i class="material-icons" id="">class</i>
            Asignar Propietario
            </Typography>
            <Typography id="modal-modal-description" >
            
            
            <div className="botonesdecambiso">
            
            <a class="waves-effect waves-light btn" onClick={wichone}>ASIGNAR</a>
            <a class="waves-effect waves-light btn" id="botondecambio1" onClick={wichone2}><i class="material-icons">chevron_right</i></a>
            </div>
            
            <select className="browser-default"  id="selectconsorcio31" ref={propietarioid} onClick={getpropietarios}>
            <option value="" disabled selected>
            Propietarios
            </option>
            {propietarioslist.map((option) => (
            <option value={option.id} >{option.name + " " + option.lastName}</option>
            ))}
            </select>

            

            <div className="botonguardado">
            <a class="btn" id="boton1" onClick={asignarPropietario}>ASIGNAR</a>
            </div>

            </Typography>
            </>
            :
            <>
            <Typography id="modal-modal-title" variant="h6" component="h4"><i class="material-icons" id="">class</i>
            Agregar Propietario
            </Typography>
            <Typography id="modal-modal-description" >
            
            
            <div className="botonesdecambisos">
            
            <a class="waves-effect waves-light btn" id="botondecambio1" onClick={wichone}><i class="material-icons">chevron_left</i></a>
            <a class="waves-effect waves-light btn" onClick={wichone2}>AGREGAR</a>
            </div>

            <div class="input-field col s10" id="descripcion">
            <input id="NombreyApellido" className="descripcion" type="text" class="validate" ref={name}/>
            <label for="NombreyApellido">Nombre</label>
            </div>
            <div class="input-field col s10" id="descripcion">
            <input id="lastname" className="descripcion" type="text" class="validate" ref={lastname}/>
            <label for="lastname">Apellido</label>
            </div>
            <div class="input-field col s10" id="descripcion1">
            <input id="Domicilio" className="descripcion" type="text" class="validate" ref={address}/>
            <label for="Domicilio">Domicilio</label>
            </div>
            
            <div class="input-field col s10" id="descripcion3">
            <input id="cuit" className="descripcioncuit" type="text" class="validate" ref={cuit}/>
            <label for="cuit">CUIT</label>
            </div>

            <select className="browser-default"  id="selectconsorcio33"  ref={province} onClick={getprovince}>
            <option value="" disabled selected>
            Provincia
            </option>
            {localidad.map((option) => (
            <option value={option.id} >{option.name}</option>
            ))}
            </select>
            <select className="browser-default"  id="selectconsorcio33"  ref={locality} onClick={getLocalidad}>
            <option value="" disabled selected>
            Localidad
            </option>
            {localidadelegida.map((option) => (
            <option value={option.id} >{option.name}</option>
            ))}
            </select>
            <select className="browser-default"  id="selectconsorcio33"  ref={neighborhood} onClick={getBarrio}>
            <option value="" disabled selected>
            Barrio
            </option>
            {getbarrioelegido.map((option) => (
            <option value={option.id} >{option.name}</option>
            ))}
            </select>

            

            <div className="botonguardado">
            <a class="btn" id="boton1" onClick={postInquilinos}>AGREGAR</a>
            </div>
            </Typography></>
            }
        </Box>
        </Modal>
    </div>

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
            
            <StyledTableCell align="right">Denominacion</StyledTableCell>
            <StyledTableCell align="right">Propietario</StyledTableCell>
            <StyledTableCell align="right">Inquilino</StyledTableCell>
            <StyledTableCell align="right">CUENTA</StyledTableCell>
            <StyledTableCell align="right">BORRAR</StyledTableCell>
        </StyledTableRow>
        </TableHead>
        <TableBody className="tablebody">
        {datoBusqueda
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
            <StyledTableRow key={row.name}>
                
                <StyledTableCell align="right" style={{borderBottom:"none"}}>
                {row.name}
                </StyledTableCell>
                

                {row.owner === null ?
                    
                    <StyledTableCell align="right" style={{borderBottom:"none"}}>

                        <a class="btn-floating btn-large waves-effect waves-light transparent" ><i class="material-icons" id={row.id} 
                        onClick={() => {
                        settestid(row.id)
                        setunidadid(row.id)
                        openModal();
                        }}>person_add</i></a>
                        
                        </StyledTableCell>
                    :
                    <StyledTableCell align="right" style={{borderBottom:"none"}}>
                    {row.owner.name +" "+ row.owner.lastName}
                    <a class="btn-floating btn-tiny waves-effect waves-light transparent" ><i class="material-icons" id={row.id}>create</i></a>
                    </StyledTableCell>
                    
                }

                <StyledTableCell align="right" style={{borderBottom:"none"}}>
                    <Link to={`/consortiums/${id}/units/${row.id}/roomers`}><a class="btn-floating btn-large waves-effect waves-light transparent" ><i class="material-icons" onClick={display} id={row.id}>remove_red_eye</i></a></Link>
                </StyledTableCell>

                <StyledTableCell id="contenido" align="right" style={{borderBottom:"none"}}>
                    <Link to={`/consortiums/${id}/units/${row.id}/roomers`}><a class="btn-floating btn-large waves-effect waves-light transparent" ><i class="material-icons" onClick={display} id={row.id}>account_balance_wallet</i></a></Link>
                </StyledTableCell>

                
                
                
                
                
                
                
                
                <StyledTableCell align="right" style={{borderBottom:"none"}}>
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

export default UnitView;