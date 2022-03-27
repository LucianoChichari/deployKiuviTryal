import React from "react";
import 'materialize-css'
import M from 'materialize-css/dist/js/materialize.min.js'
import { useEffect, useState } from "react";
import './style.css'
import {Collapsible, CollapsibleItem} from 'react-materialize'
import AltaGastos from "../altaGastos/AltaGastos";
import GastosSearch from "../GastosSearch/GastosSearch";
import {useRecoilValue} from 'recoil'
import GastosShortcut from '../../components/KeyShortcuts/GastosShortcut/GastosShortcut';
import {authAtom} from '../../_state/Auth'
import {useUserActions} from '../../_actions/user.actions'
import LiquidacionesPGPM from "../Liquidaciones/LiquidacionesPGPM";
import ImprimirLiq from "../ImprimirLiq/ImprimirLiq";
import AsignacionCoeficientes from "../AsignacionCoeficientes/AsignacionCoeficientes";
function Navbar() {

    const userActions = useUserActions();
    
    useEffect(() => {
        var sidenav = document.querySelectorAll(".sidenav");
        M.Sidenav.init(sidenav, {});
    }, [ ]);
    
    const [modal2Visible,setModal2Visible]=useState(false);
    const handleModalOpen = () =>{
        setModal2Visible(true)
    }
    const handleCancel = () =>{
        setModal2Visible(false)
    }
    return (
    <>
    <div class="navbar-fixed">
    <nav id="mobile-demo" className="nav">
        <div class="nav-wrapper" id="mobile-demo">
        <a href="#" data-target="slide-out" class="sidenav-trigger show-on-large "><i class="material-icons">menu</i></a>
        
            <ul class="right hide-on-med-and-down">
            <li><a href="/Consorcios"><i class="material-icons">business</i></a></li>
            <li>|</li>
            <li><a onClick={handleModalOpen}><i class="material-icons">account_balance</i></a></li>
            <li>|</li>
            <li><a href="/"><i class="material-icons">home</i></a></li>
            <li>|</li>
            <li onClick={userActions.logout}><a><i class="material-icons">power_settings_new</i></a></li>
            
            </ul>
            
        
        </div>
    </nav>
    </div>
    <GastosShortcut visible={modal2Visible} onCancel={handleCancel}/>
    <ul id="slide-out" class="sidenav">
    <Collapsible accordion>
        
        <CollapsibleItem expanded={false} header = {<a  class="letter">Administracion</a>}
        icon = {<i class="material-icons">expand_more</i>}
        node = 'div'
        >

        <li><a class="prueba" href="/Consorcios">Consorcios <i class="material-icons">keyboard_arrow_right</i></a></li>
        <li><a class="prueba" href="/Conceptos">Conceptos <i class="material-icons">keyboard_arrow_right</i></a></li>
        <li><a class="prueba" href="/adminexpensa">Administracion Expensas <i class="material-icons">keyboard_arrow_right</i></a></li>
        <AsignacionCoeficientes/>
        </CollapsibleItem>

        <CollapsibleItem expanded={false} header = {<a class="letter">Cta. Cte.</a>}
        icon = {<i class="material-icons">expand_more</i>}
        node = 'div'
        >
        
        <AltaGastos/>
        

        </CollapsibleItem>

        <CollapsibleItem expanded={false} header = {<a  class="letter">Consulta</a>}
        icon = {<i class="material-icons">expand_more</i>}
        node = 'div'
        >
        <GastosSearch/>
        </CollapsibleItem>

        <CollapsibleItem expanded={false} header = {<a  class="letter">Liquidacion</a>}
        icon = {<i class="material-icons">expand_more</i>}
        node = 'div'
        >
        <LiquidacionesPGPM/>
        <ImprimirLiq/>
        </CollapsibleItem>

        <li><div class="divider"></div></li>

        <CollapsibleItem expanded={false} header = {<a  class="letter">Listados</a>}
        icon = {<i class="material-icons">expand_more</i>}
        node = 'div'
        >
        <li><a class="prueba" href="/provinces">Localidades <i class="material-icons">keyboard_arrow_right</i></a></li>
        </CollapsibleItem>

        <CollapsibleItem expanded={false} header = {<a  class="letter">Mantenimiento</a>}
        icon = {<i class="material-icons">expand_more</i>}
        node = 'div'
        >
        
        </CollapsibleItem>

        <li><div class="divider"></div></li>

        <li onClick={userActions.logout}><a class="waves-effect" >Cerrar Sesion <i class="material-icons">undo</i></a></li>
        </Collapsible>
        
    </ul>
    </>

);
}
export default Navbar;