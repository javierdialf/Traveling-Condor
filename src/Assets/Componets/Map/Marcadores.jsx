import { useMap } from 'react-leaflet';
import React, { useEffect, useContext } from "react";
import L, { latLng, marker } from 'leaflet';
import { GeolocationContext } from '../Context/GeolocationContext';

const CrearMarcador = ({ addPuntos }) => {
    const map = useMap();
    const { Geolocation, setGeolocation } = useContext(GeolocationContext);
    

    useEffect(() => {
    
        if (Geolocation) {
        L.marker([Geolocation.lat, Geolocation.lng], {draggable: true}).addTo(map);
        }
        
        const ManejadorMarcador = (e) => {
            const nuevoMarcador = [e.latlng.lat, e.latlng.lng];
            L.marker(nuevoMarcador).addTo(map);
            addPuntos(nuevoMarcador);
            if (!Geolocation) {
                setGeolocation({ lat: e.latlng.lat, lng: e.latlng.lng }, {draggablve:true});
            }
            
        };

        map.on('dblclick', ManejadorMarcador);

        return () => {
            map.off('dblclick', ManejadorMarcador);
        };

    }, [map, Geolocation, addPuntos, setGeolocation]);

    return null;
};

export default CrearMarcador;
