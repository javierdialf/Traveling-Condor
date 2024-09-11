
import React, { useContext } from "react";
import { PuntosContext } from "../Context/PuntosContext";
import {clearLayers} from 'leaflet';
import { RutaDibujarContext } from "../Context/RutaDibujarContext";
import { PuntosDeInteresContext } from "../Context/PuntosDeInteresContext"; // Ensure this import is correct

const LimpiarMapa = () => {
    const {Puntos} = useContext(PuntosContext);
    const {setRutaDibujar} = useContext(RutaDibujarContext);
    const {setPuntosDeInteres, PuntosDeInteres} = useContext(PuntosDeInteresContext);

    const clearMap = () => {
        if(Puntos.length > 1 || PuntosDeInteres){
            clearLayers;
            setPuntos([]);
            setPuntosDeInteres(null);
          }
          setRutaDibujar([]);
         
    }
     
    return clearMap;
}

export default LimpiarMapa;