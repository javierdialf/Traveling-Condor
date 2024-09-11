import { useMap } from 'react-leaflet';
import React, { useEffect, useContext, useRef } from "react";
import L, { latLng, marker } from 'leaflet';
import { PuntosDeInteresContext } from '../Context/PuntosDeInteresContext';
import bacano from '../../Assets/location.png';

const CrearMarcadoresPersonalizados = () => {
    const map = useMap();
    const {PuntosDeInteres} = useContext(PuntosDeInteresContext);
    const marcadoresRef = useRef(null);
    console.log(PuntosDeInteres);

    let IconInteres = L.icon({
        iconUrl: bacano,
        iconSize: [38, 35],
        iconAnchor: [10, 10],
    });
        
      useEffect(() => {
        if (marcadoresRef.current !== null) {
            marcadoresRef.current.remove();
        }

        if(PuntosDeInteres){
            marcadoresRef.current = L.marker([PuntosDeInteres.latitud, PuntosDeInteres.longitud], {icon: IconInteres}).addTo(map).bindTooltip(PuntosDeInteres.nombre).openTooltip();
        }
      },[PuntosDeInteres])




    return null;
};

export default CrearMarcadoresPersonalizados;
