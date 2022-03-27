import Navbar from '../../components/navbar/navbar'
import React from 'react';
import Mainpage from '../../components/mainpage/Mainpage';
import './landingcs.scss'
import loginlogo from '../../assets/IconsAndImagesLogin/gifmain.gif'
import './style.css'
import { Scrollbars } from 'react-custom-scrollbars';
import M from 'materialize-css'
import GastosShortcut from '../../components/KeyShortcuts/GastosShortcut/GastosShortcut';
import { useState, useEffect, useRef } from "react";

function Landing() {
  
   

    return (
    <>
    <Navbar/>
    <div className="centertext">
            <img class="center-align" id="imgcasa" alt="img" src={loginlogo}/>
            <h2 className="disp">Bienvenido Administrador!</h2>
            <br/>
            <h4 className="disp"><i class="small material-icons">expand_more</i>Guia de Navegacion<i class="small material-icons">expand_more</i></h4>
        </div>

    <div class="container">
    <div class="timeline">
      
    <div class="timeline-event">
        <div class="card timeline-content">
          <div class="card-image waves-effect waves-block waves-light">
            
            <span class="card-title gradient white-text text-darken-4">
							2018<br/>
							<small>January 17th</small>
						</span>
          </div>
          <div class="card-content teal white-text">
            <p>Shortcuts de teclado : <br/>
            <i class="tiny material-icons">expand_more</i>
            Shift+G -> 
            <i class="tiny material-icons">chevron_right</i>
            Abre Alta de Gastos
            <br/>
            <i class="tiny material-icons">expand_more</i>
            Shift+S -> 
            <i class="tiny material-icons">chevron_right</i>
            Abre Consulta de Gastos
            <br/>
            </p>
          </div>
        </div>
        <div class="timeline-badge red lighten-3 white-text"></div>
      </div>

			<div class="timeline-event">
        <div class="card timeline-content">
          <div class="card-image waves-effect waves-block waves-light">
            
            <span class="card-title gradient white-text text-darken-4">
							2018<br/>
							<small>January 17th</small>
						</span>
          </div>
          <div class="card-content teal white-text">
            <p>Cargas de Consorcios, Unidades, Inquilinos y Propietarios : <br/>
            <i class="tiny material-icons">dehaze</i>
            Menu -> 
            <i class="tiny material-icons">expand_more</i>
            Administracion -> 
            <i class="tiny material-icons">chevron_right</i>
            Consorcios
            </p>
          </div>
        </div>
        <div class="timeline-badge red lighten-3 white-text"></div>
      </div>
			
			
			<div class="timeline-event">
        <div class="card timeline-content">
          <div class="card-image waves-effect waves-block waves-light">
            
            <span class="card-title gradient white-text text-darken-4">
							2018<br/>
							<small>January 17th</small>
						</span>
          </div>
          <div class="card-content teal white-text">
            <p>Vista y Carga de Conceptos : <br/>
            <i class="tiny material-icons">dehaze</i>
            Menu -> 
            <i class="tiny material-icons">expand_more</i>
            Administracion -> 
            <i class="tiny material-icons">chevron_right</i>
            Conceptos
            </p>
          </div>
        </div>
        <div class="timeline-badge red lighten-3 white-text"></div>
      </div>
			
			
			<div class="timeline-event">
        <div class="card timeline-content">
          <div class="card-image waves-effect waves-block waves-light">
            
            <span class="card-title gradient white-text text-darken-4">
							2018<br/>
							<small>January 17th</small>
						</span>
          </div>
          <div class="card-content teal white-text">
            <p>Alta de Gastos : <br/>
            <i class="tiny material-icons">dehaze</i>
            Menu -> 
            <i class="tiny material-icons">expand_more</i>
            Cta. Cte. -> 
            <i class="tiny material-icons">chevron_right</i>
            Alta Gastos
            </p>
          </div>
        </div>
        <div class="timeline-badge red lighten-3 white-text"></div>
      </div>

	
						
			
			<div class="timeline-event">
        <div class="card timeline-content">
          <div class="card-image waves-effect waves-block waves-light">
            
            <span class="card-title gradient white-text text-darken-4">
							2018<br/>
							<small>January 17th</small>
						</span>
          </div>
          <div class="card-content teal white-text">
            <p>Consulta de Gastos : <br/>
            <i class="tiny material-icons">dehaze</i>
            Menu -> 
            <i class="tiny material-icons">expand_more</i>
            Consulta -> 
            <i class="tiny material-icons">chevron_right</i>
            Consulta de Gastos
            </p>
          </div>
        </div>
        <div class="timeline-badge red lighten-3 white-text"></div>
      </div>
			
			
			<div class="timeline-event">
        <div class="card timeline-content">
          <div class="card-image waves-effect waves-block waves-light">
            
            <span class="card-title gradient white-text text-darken-4">
							2018<br/>
							<small>January 17th</small>
						</span>
          </div>
          <div class="card-content teal white-text">
            <p>Vista y Carga de Localidades : <br/>
            <i class="tiny material-icons">dehaze</i>
            Menu -> 
            <i class="tiny material-icons">expand_more</i>
            Listados -> 
            <i class="tiny material-icons">chevron_right</i>
            Localidades
            </p>
          </div>
        </div>
        <div class="timeline-badge red lighten-3 white-text"></div>
      </div>
    </div>
  </div>
  
    </>
    );
}

export default Landing;
