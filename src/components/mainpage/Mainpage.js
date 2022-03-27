import React from "react";
import './style.css'
import { ToastContainer, toast} from 'react-toastify';
import loginlogo from '../../assets/IconsAndImagesLogin/gifmain.gif'
import M from 'materialize-css/dist/js/materialize.min.js';
function Mainpage(props) {

    const notify = () => toast.success('🦄 Wow so easy!', {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

    let User = "{User}"

    return (<>
        <div className="centertext">
            <img class="center-align" id="imgcasa" alt="img" src={loginlogo}/>
            <h1 className="disp">{props.title}</h1>
        </div>
    </>
    );
}

export default Mainpage;