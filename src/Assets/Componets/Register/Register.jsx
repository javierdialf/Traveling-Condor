import React from 'react';
const API = 'http://localhost:5285/api/Usuarios/Creacion'
import { useState } from 'react';
import './Register.css'
import { AiOutlineSwapRight } from "react-icons/ai";
import axios from 'axios';

const Register = () => {



const ManejadorForm =  async (e) => {
  await setForm({
    ...form,
    [e.target.name] : e.target.value
  });
  console.log(form);
}

const CrearPost = async (e) =>{
  e.preventDefault();
  try {
        axios.post(API, form)
       .then(res => {
        console.log(res.status)
       })
  } catch (error) {
         
}}


  return (
 <div className="registerPager flex">
            <div className="container flex">
                <a href="/"></a>
                <div className="form">
                    <h1> Bienvenido</h1>
                    <h2> Ingrese sus datos</h2>
                    <br></br>
                    <label htmlFor="name">Nombre</label>
                    <input type="text"></input>

                    <label htmlFor="correoElectronico">Correo</label>
                    <input type="email"/>

                    <label htmlFor="contrasenia">Contraseña </label>
                    <input type="password" />

                    <label htmlFor="ConfirmarContrasenia">Confirmar Contraseña </label>
                    <input type="password" />
                    <br></br>

                    
                    <button type="submit" className="btn flex">
                           <span>
                            Login
                            </span>
                    <AiOutlineSwapRight className="icon"></AiOutlineSwapRight>
                    </button>

                </div>
                

            </div>
            

        </div>
  );
}

export default Register;