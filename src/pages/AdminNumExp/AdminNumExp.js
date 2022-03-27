import React from "react";
import Mainpage from "../../components/mainpage/Mainpage";
import AddConsortium from "../../components/addconsortium/addConsortium";
import ConsortiumView from "../../components/consortiumview/consortiumView";
import Searchbar from "../../components/searchbar/searchbar";
import Navbar from '../../components/navbar/navbar'
import loginlogo from '../../assets/IconsAndImagesLogin/gifmain.gif'
import AdmNumExp from "../../components/AdmNumExp/AdmNumExp";
import './adminstyle.css'
function AdminNumExp(props) {

    return (
        <>
        <Navbar/>

         <div className="centertext">
            <img class="center-align" id="imgcasa" alt="img" src={loginlogo}/>
            <h2 className="disp">Administracion de numeros de expensa</h2>
        </div>

        <AdmNumExp/>
        </>
    );
}

export default AdminNumExp;