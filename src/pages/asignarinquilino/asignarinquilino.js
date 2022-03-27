import React from "react";
import Mainpage from "../../components/mainpage/Mainpage";
import InquilinosView from "../../components/inquilinosview/inquilinosview";
import Navbar from '../../components/navbar/navbar'
function AsignarInquilinos(props) {
    
    return (
        
        <>
        <Navbar/>
        <Mainpage title="Inquilinos"/>
        <InquilinosView/>
        </>

    );
}

export default AsignarInquilinos;