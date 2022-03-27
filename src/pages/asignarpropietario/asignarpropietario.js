import React from "react";
import Mainpage from "../../components/mainpage/Mainpage";
import PropietarioView from "../../components/propietariosview/propietariosview";
import Navbar from '../../components/navbar/navbar'
function AsignarPropietario(props) {
    
    return (
        
        <>
        <Navbar/>
        <Mainpage title="Propietarios"/>
        <PropietarioView/>
        </>

    );
}

export default AsignarPropietario;