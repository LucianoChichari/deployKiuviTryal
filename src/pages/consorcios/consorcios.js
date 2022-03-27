import React from "react";
import Mainpage from "../../components/mainpage/Mainpage";
import AddConsortium from "../../components/addconsortium/addConsortium";
import ConsortiumView from "../../components/consortiumview/consortiumView";
import Searchbar from "../../components/searchbar/searchbar";
import Navbar from '../../components/navbar/navbar'
import loginlogo from '../../assets/IconsAndImagesLogin/gifmain.gif'
import './consorciostyle.css'
function Consorcios(props) {

    return (
        <>
        <Navbar/>

         <div className="centertext">
            <img class="center-align" id="imgcasa" alt="img" src={loginlogo}/>
            <h2 className="disp">CONSORCIOS</h2>
        </div>

        <ConsortiumView/>
        </>
    );
}

export default Consorcios;