

import './App.css';
import axios from 'axios';
import { FaUserShield } from "react-icons/fa";
import { GoShieldLock } from "react-icons/go";
import { AiOutlineSwapRight } from "react-icons/ai";
import React, { useState, useEffect, useContext} from "react";
import { useNavigate } from 'react-router-dom';
import video from '../../Assets/LoginAssets/condor.mp4';
import logo from  '../../Assets/LoginAssets/CondorLogo.png';
import { Link} from "react-router-dom";
import { Usuario } from '../../Models/Usuario';
import { UserContext } from '../Context/UserContext';
import swal from 'sweetalert';


const API = 'http://localhost:5285/api/Usuarios/Iniciosesion';

const Login = () => {

const [form, setForm] = useState({
    'correo' : null,
    'contrasenia' : null
})

const MostraAlerta = () => {
    swal({
        title: 'Error inicio de Sesion',
        text: errorMSG,
        icon: 'error',
        button:'Aceptar'
    });
}

const {setUser, user} = useContext(UserContext); 
const [errorMSG, setError] = useState('');
const navigate = useNavigate();

const manejadorIniciar = (e) => {
    e.preventDefault();
    axios.post(API, form)
    .then(res => {
        console.log(res.status);
        if (res.status === 200) {
            const userLogin = new Usuario(
              res.data.id,
              res.data.nombre,
              res.data.correoElectronico,
              res.data.contrasenia,
              res.data.role
            );
            setUser({
                id: userLogin.id,
                nombre: userLogin.nombre,
                role: userLogin.role,
              });
          }else if(res.status === 404){
            setError('Usuario no encontrado');
            MostraAlerta
          }
    })
    .catch(malo => {
         setError('Error de inicio de sesion');
         MostraAlerta();
    })
};


useEffect(() => {
    if(user){
        navigate('/traveling');
        console.log(user);
    }
},[user])


const manejadorForm = async e =>{
  await setForm({
      ...form,
      [e.target.name] : e.target.value
  });
  console.log(form);
}


return(
    <div className='loginPage'>
        <div className="container flex">
            <div className="videoDiv">
                <video src={video} autoPlay muted loop></video>

                <div className="textDiv">
                    <h1 className="title">
                        El Placer al Viajar
                    </h1>
                </div>

                <div className="footerDiv flex">
                    <span className="text">
                        No tienes una cuenta?, Unetenos
                    </span>
                    <Link to='/register'>
                        <button className="btn">
                            Crear Cuenta
                        </button>
                    </Link>
                </div>

            </div>
            
            <div className="formDiv flex">
                <div className="headerDiv">
                    <img src={logo} alt="Logo img"></img>
                    
                </div>


                <form className="form grid" onSubmit={manejadorIniciar}>    
                    <div className="inputDiv">
                        <label htmlFor="username">
                            Usuario
                        </label>
                        <div className="input flex">
                            <FaUserShield className="icon">
                            </FaUserShield>
                            <input  
                            placeholder="Ingrese su Correo Electronico"
                            type="text"
                            id="username"
                            name="correo"
                            onChange={manejadorForm}/>
        

                        </div>
                    </div>

                    <div className="inputDiv">
                        <label htmlFor="password">
                            Contraseña
                        </label>
                        <div className="input flex">
                            <GoShieldLock className="icon">
                            </GoShieldLock>
                            <input 
                            placeholder="Ingrese su contraseña"
                            type="text"
                            id="password"
                            name="contrasenia"
                            onChange={manejadorForm}
                            />

                        
                        </div>
                    </div>
                    
                    <button type="submit" className="btn flex">
                       <span>
                        Login
                        </span>
                        <AiOutlineSwapRight className="icon"></AiOutlineSwapRight>
                    </button>
                    

                    <span className="footerDiv flex">
                        Olvidaste tu contraseña? <a href="">Click Here</a>
                    </span>
                </form>
            </div>

        </div>
    </div>
)
}

export default Login