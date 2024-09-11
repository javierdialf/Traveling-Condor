import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaRoute,
    FaBus,
    FaMapMarkerAlt,
    FaStar,
} from "react-icons/fa";
import logoempresa from '../../Assets/LogoCode.png';
import Inicio from '../Pages/Inicio'
import Recomendacion from '../Pages/Recomendacion';
import PuntoInteres from '../Pages/PuntosIntere';
import RutasSiva from '../Pages/RutasSiva';
import Misruta from '../Pages/Misruta';

const Sidebar = ({ onMenuItemClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const menuItem = [
        {
            path: <Inicio/>,
            name: "Inicio",
            icon: <FaTh />
        },
        {
            path: <Misruta/>,
            name: "Mis Rutas",
            icon: <FaRoute />
        },
        {
            path: <RutasSiva/>,
            name: "Siva",
            icon: <FaBus />
        },
        {
            path: <PuntoInteres/>,
            name: "Puntos",
            icon: <FaMapMarkerAlt />
        },
        {
            path: <Recomendacion/>,
            name: "Recomendacion",
            icon: <FaStar />
        }
    ];

    return (
        <div>
            <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
                        <img className="codegear" src={logoempresa} alt="D:" />
                    </h1>
                    <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>

                {menuItem.map((item, index) => (
                    <div
                        key={index}
                        className="link"
                        activeclassName="active"
                        onClick={() => onMenuItemClick(item.path)}
                        style={{ cursor: 'pointer'  }}
                        
                    >
                        <div className="icon">{item.icon}</div>
                        <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name} </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;


