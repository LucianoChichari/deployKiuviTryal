import React from "react";
import Mainpage from "../../components/mainpage/Mainpage";
import AddConsortium from "../../components/addconsortium/addConsortium";
import ConsortiumView from "../../components/consortiumview/consortiumView";
import Searchbar from "../../components/searchbar/searchbar";
import Navbar from '../../components/navbar/navbar'
import GastosUnidad from "../../components/GastosUnidadesView/GastosUnidades";

function GastosPerUnit(props) {

    return (
        <>
        <Navbar/>
        <Mainpage title="Gastos de unidad buscada"/>
        <GastosUnidad/>
        </>
    );
}

export default GastosPerUnit;