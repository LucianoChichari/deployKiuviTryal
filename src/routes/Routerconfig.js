import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Landing from '../pages/landing/Landing';
import Consorcios from '../pages/consorcios/consorcios';
import Unidades from '../pages/unidades/unidades';
import AsignarPropietario from '../pages/asignarpropietario/asignarpropietario';
import AsignarInquilinos from '../pages/asignarinquilino/asignarinquilino';
import Conceptos from '../pages/Conceptos/Conceptos';
import LoginPage from '../pages/Login/LoginPage';
import { PrivateRoute } from '../components/privateRoute';
import {history} from '../_helpers/history'
import Provincias from '../pages/Provincias/Provincias';
import Localidades from '../pages/Localidades/Localidades';
import Barrios from '../pages/Barrios/Barrios';

import GastosPerConsorcio from '../pages/GastosPerCons/GastosPerCons';
import GastosPerUnit from '../pages/GastosPerUnit/GastosPerUnit';
import { useHotkeys } from 'react-hotkeys-hook';
import { useState} from "react";
import GastosShortcut from '../components/KeyShortcuts/GastosShortcut/GastosShortcut';
import GastosSearchSC from '../components/KeyShortcuts/GastosSearchSC/GastosSearchSC';

import AdminNumExp from '../pages/AdminNumExp/AdminNumExp';
import CuentaCorrienteComponent from '../components/CuentaCorriente/CuentasCorrientes';


function Routerconfig() {

    const [showAltaGastos, setShowAltaGastos] = useState(false)
    const [showGastosSearch, setshowGastosSearch] = useState(false)
    

    useHotkeys('shift+g', () => setShowAltaGastos(!showAltaGastos))
    useHotkeys('shift+s', () => setshowGastosSearch(!showGastosSearch))
    
    return (
        <Router history={history}>
            {showAltaGastos? 
            <GastosShortcut/>
            :
            <div></div>
            }
            {showGastosSearch?
            <GastosSearchSC/>
            :
            <div></div>
            }
            
            <Switch>
            <PrivateRoute path='/cuentacorriente' exact component={CuentaCorrienteComponent}></PrivateRoute>
                <PrivateRoute path='/adminexpensa' exact component={AdminNumExp}></PrivateRoute>
                <PrivateRoute path='/consorcio/:id/gastos'exact component={GastosPerConsorcio}></PrivateRoute>
                <PrivateRoute path='/consorcio/:id/unidad/:id2/gastos' exact component={GastosPerUnit}></PrivateRoute>
                <PrivateRoute path='/provinces/:id/localities/:idnh/neighborhoods' exact component={Barrios}></PrivateRoute>
                <PrivateRoute path='/provinces/:id/localities' exact component={Localidades}></PrivateRoute>
                <PrivateRoute path='/provinces' exact component={Provincias}></PrivateRoute>
                <Route path='/login' exact component={LoginPage}></Route>
                <PrivateRoute exact path="/" component={Landing}  />
                <PrivateRoute path='/Consorcios' exact component ={Consorcios}></PrivateRoute>
                <PrivateRoute path='/Conceptos' exact component ={Conceptos}></PrivateRoute>
                <PrivateRoute path='/Unidades/:id' exact component ={Unidades}></PrivateRoute>
                <PrivateRoute path='/Propietarios' exact component ={AsignarPropietario}></PrivateRoute>
                <PrivateRoute path='/consortiums/:id/units/:idnh/roomers' exact component ={AsignarInquilinos}></PrivateRoute>
                <Redirect from="*" to="/"/>
            </Switch>
        
        </Router>
    )
}

export default Routerconfig

