import React from "react";
import './style.css'
import {Dropdown, Divider} from 'react-materialize'
function Searchbar(props) {
    //let User = "{User}"
    return (<div className='SB'>
        <input type="text" placeholder="Search..." style={{ width: "200px" }}/>
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
    
    <a href="#">
    Cargados
    </a>
        <Divider />
    <a href="#">
    Vacios
    </a>
        </Dropdown>
    </div>
    );
}

export default Searchbar;