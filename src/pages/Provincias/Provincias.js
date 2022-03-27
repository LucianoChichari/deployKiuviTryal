import React from "react";
import Mainpage from "../../components/mainpage/Mainpage";
import AddConsortium from "../../components/addconsortium/addConsortium";
import ConsortiumView from "../../components/consortiumview/consortiumView";
import Searchbar from "../../components/searchbar/searchbar";
import Navbar from '../../components/navbar/navbar'
import ProvinceView from "../../components/provincesView/ProvincesView";
import loginlogo from '../../assets/IconsAndImagesLogin/gifmain.gif';
import './style.css';
function Provincias(props) {

    return (
        <>
        <Navbar/>
        <div className="centertext">
            <img class="center-align" id="imgcasa" alt="img" src={loginlogo}/>
            <h2 className="disp">PROVINCIAS</h2>
        </div>
        <ProvinceView/>
        </>
    );
}

export default Provincias;