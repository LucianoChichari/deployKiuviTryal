import React from "react";
import Mainpage from "../../components/mainpage/Mainpage";
import AddConsortium from "../../components/addconsortium/addConsortium";
import ConsortiumView from "../../components/consortiumview/consortiumView";
import Searchbar from "../../components/searchbar/searchbar";
import Navbar from '../../components/navbar/navbar'
import ProvinceView from "../../components/provincesView/ProvincesView";
import LocalitiesView from "../../components/localitiesView/LocalitiesViews";
import loginlogo from '../../assets/IconsAndImagesLogin/gifmain.gif';
import './style.css';
function Localidades(props) {

    return (
        <>
        
        <Navbar/>
        <div className="centertext">
            <img class="center-align" id="imgcasa" alt="img" src={loginlogo}/>
            <h2 className="disp">LOCALIDADES</h2>
        </div>
        <LocalitiesView/>
        </>
    );
}

export default Localidades;