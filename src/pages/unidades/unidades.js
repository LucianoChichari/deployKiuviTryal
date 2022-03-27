import React from "react";
import Mainpage from "../../components/mainpage/Mainpage";
import AddUnit from "../../components/addunit/addUnit";
import UnitView from "../../components/unitview/unitview";
import Searchbar from "../../components/searchbar/searchbar";
import Navbar from '../../components/navbar/navbar';
import loginlogo from '../../assets/IconsAndImagesLogin/gifmain.gif'
import './unidades.css'
function Unidades(props) {
    
    return (
        
        <>
        <Navbar/>
        <div className="centertext">
            <img class="center-align" id="imgcasa" alt="img" src={loginlogo}/>
            <h4 className="disp">UNIDADES DEL CONSORCIO SELECCIONADO</h4>
        </div>
        <br/>
        <UnitView/>
        </>

    );
}

export default Unidades;