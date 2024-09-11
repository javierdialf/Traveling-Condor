import { useEffect, useContext, useRef, useState, useCallback } from "react";
import { useMap } from "react-leaflet";
import L,{clearLayers,removeLayer} from "leaflet";
import axios from 'axios';
import { RutaEnviar } from '../../Models/Ruta';
import { UserContext } from '../Context/UserContext';
import { GeolocationContext } from '../Context/GeolocationContext';
import Alerta from "../Vista/Alerta";
import clear from '../../Assets/delete.png'
import { Alert } from "bootstrap";
import { RutaDibujarContext } from "../Context/RutaDibujarContext";
import { PuntosContext } from "../Context/PuntosContext";
import { PuntosDeInteresContext } from "../Context/PuntosDeInteresContext";
import LimpiarMapa from "./Limpiar";

const BtnLimpiar = () => {
  const map = useMap();
  const {Puntos, setPuntos} = useContext(PuntosContext);
  const controlBton = useRef(null);
  const PuntosRef = useRef(Puntos);
  const {RutaDibujar, setRutaDibujar} = useContext(RutaDibujarContext);
  const {PuntosDeInteres, setPuntosDeInteres} = useContext(PuntosDeInteresContext);
  const clearMap = LimpiarMapa();
  

  useEffect(() => {
    let customControl = L.Control.extend({
      options: {
        position: 'bottomleft'
      },

            onAdd: function (map) {
              let container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
              container.style.backgroundImage = `url(${clear})`;
              container.style.backgroundSize = "contain";
              container.style.width = '30px';
              container.style.height = '30px';
              container.style.borderRadius = '50%';
              container.style.border = '1px solid red',
              container.style.backgroundRepeat = "no-repeat";
              container.style.backgroundPosition = "center"; 

              L.DomEvent.disableClickPropagation(container);
              L.DomEvent.on(container,'click', () => {
                clearMap();
              });
              
              return container;
            }
          });


    const control = new customControl()
    map.addControl(control);
    controlBton.current = control;

    return () => {
      if(control)map.removeControl(control);
    }
    
  }, [map]);




  return null;
}

export default BtnLimpiar;
