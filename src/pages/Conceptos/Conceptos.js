import React from "react";
import Mainpage from "../../components/mainpage/Mainpage";
import Searchbar from "../../components/searchbar/searchbar";
import ConceptosView from "../../components/conceptosView/ConceptosView";
import Navbar from '../../components/navbar/navbar'
function Conceptos(props) {
    
    return (
        
        <>
        <Navbar/>
        <Mainpage title="Conceptos"/>
        <ConceptosView/>
        </>

    );
}

export default Conceptos;