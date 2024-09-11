import '../Login/App.css';
import axios from 'axios';
import { FaUserShield } from "react-icons/fa";
import { GoShieldLock } from "react-icons/go";
import { AiOutlineSwapRight } from "react-icons/ai";
import React, { useState, useEffect, useContext} from "react";
import {json, useNavigate } from 'react-router-dom';
import video from '../../Assets/LoginAssets/condor.mp4';
import logo from  '../../Assets/LoginAssets/CondorLogo.png';
import { Link} from "react-router-dom";
import { Usuario } from '../../Models/Usuario';
import { UserContext } from '../Context/UserContext';
import swal from 'sweetalert';


const Register = () =>{
    const API = 'http://localhost:5285/api/Usuarios/Creacion';
    const [errorMSG, setError] = useState('');

    const[form, setForm] = useState({
        'nombre': null,
        'correoElectronico': null,
        'contrasenia': null,
        'role': 'USER'
    });

    const MostraAlerta = (titleMostrar,iconB) => {
        swal({
            title: titleMostrar,
            text: errorMSG,
            icon: iconB,
            button:'Aceptar'
        });
    }

   
    const ManejadorForm = (e) => {
        setForm({
          ...form,
          [e.target.name] : e.target.value
        });
      }
      
      const CrearPost = async (e) =>{
        e.preventDefault();
        try {
              axios.post(API,form)
             .then(res => {
                console.log(form);
              if(res.status === 200){
                setError('¡Ya puedes iniciar Sesion!');
                MostraAlerta('Registro exitoso','success');
              }
             })
        } catch (error) {
            setError('OcurrNo fue posible crear su cuenta, por favor intente nuevamente');
            MostraAlerta('Error Crear Cuenta','error');
        }
        
      }



    const alerta=()=>{
      swal({
        title: "Registro Completado",
        icon: "Success",
        timer:"1000",
        buttons: ["Yes"]
      })
    } 

    return(
        <div className="loginPage flex">
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
                        ya tienes cuenta?
                    </span>
                    <Link to='/'>
                        <button className="btn">
                            Iniciar Sesion
                        </button>
                    </Link>
                </div>

                </div>
                
                <div className="formDiv flex">
                    <div className="headerDiv">
                        <img src={logo} alt="Logo img"></img>

                    </div>

                    <form action="" className="form grid">
                        
                        <div className="inputDiv">
                            <label htmlFor="username">
                                Ingrese su usuario
                            </label>
                            <div className="input flex">
                                <FaUserShield className="icon">
                                </FaUserShield>
                                <input type="text" name="nombre" placeholder="Ingrese su usuario" onChange={ManejadorForm}/>
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="correo">
                                Ingrese su Correo
                            </label>
                            <div className="input flex">
                                <FaUserShield className="icon">
                                </FaUserShield>
                                <input type="text" name="correoElectronico" placeholder="Ingrese su usuario" onChange={ManejadorForm}/>
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="password">
                                Ingrese su Contraseña
                            </label>
                            <div className="input flex">
                                <GoShieldLock className="icon">
                                </GoShieldLock>
                                <input type="password" name="contrasenia" placeholder="Ingrese su contraseña" onChange={ManejadorForm}/>
                            </div>
                        </div>
                        <Link to='/'>
                        <button type="submit" className="btn flex" onClick={CrearPost}>
                           <span>
                            Registrarse
                            </span>
                            <AiOutlineSwapRight className="icon"></AiOutlineSwapRight>
                        </button>
                        </Link>

                    </form>

                </div>
    
            </div>
        </div>
    );
}

export default Register