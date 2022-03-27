import React from "react";
import Mainpage from "../../components/mainpage/Mainpage";
import AddConsortium from "../../components/addconsortium/addConsortium";
import ConsortiumView from "../../components/consortiumview/consortiumView";
import Searchbar from "../../components/searchbar/searchbar";
import Navbar from '../../components/navbar/navbar'
import GastosView from "../../components/GastosView/GastosView";
function GastosPerConsorcio(props) {

    return (
        <>
        <Navbar/>
        <Mainpage title="Gastos de consorcio buscado"/>
        <GastosView/>
        </>
    );
}

export default GastosPerConsorcio;