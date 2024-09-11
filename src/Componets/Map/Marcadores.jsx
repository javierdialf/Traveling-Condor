import { useMap } from 'react-leaflet';
import React, { useEffect, useContext, useRef } from "react";
import L, { latLng, marker} from 'leaflet';
import { GeolocationContext } from '../Context/GeolocationContext';
import { PuntosContext } from '../Context/PuntosContext';
import iconuser from '../../Assets/iconUser.png';

const CrearMarcador = ({addPuntos}) => {
    const map = useMap();
    const { Geolocation, setGeolocation } = useContext(GeolocationContext);
    const marcadoresRef = useRef();
    const {Puntos} = useContext(PuntosContext);
    
    let IconUSER = L.icon({
        iconUrl: iconuser,
        iconSize: [38, 35],
        iconAnchor: [10, 10],
        shadowSize: [68, 95],
    });

    useEffect(() => {
        if (Geolocation) {
        const geo =L.marker([Geolocation.lat, Geolocation.lng], {draggable: true, title:'Su ubicacion'}).addTo(map).bindTooltip("Su Ubicacion").openTooltip();
        
        }
        
        const ManejadorMarcador = (e) => {
            const nuevoMarcador = [e.latlng.lat, e.latlng.lng];
            marcadoresRef.current =  L.marker(nuevoMarcador).addTo(map);
            addPuntos(nuevoMarcador);
            if (!Geolocation) {
                setGeolocation({ lat: e.latlng.lat, lng: e.latlng.lng }, {draggablve:true, title: 'su Ubicacion'});
            }
            
        };

        map.on('dblclick', ManejadorMarcador);

        return () => {
            map.off('dblclick', ManejadorMarcador);
        };

    }, [map, Geolocation, addPuntos, setGeolocation]);

    
    useEffect(() => {
        if(marcadoresRef.current){
             marcadoresRef.current.remove();
             marcadoresRef.current = null;
        }
    },[Puntos])

    return null;
};

export default CrearMarcador;
