import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { latLngBounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import TrazarRuta from "./TrazarRuta";
import CrearMarcador from "./Marcadores";
import { GeolocationContext } from "../Context/GeolocationContext";
import './mapa.css';
import BotonMapa from "./BotonMapa";
import BtnLimpiar from "../../../Componets/Map/BtnLimpiar";
import LimpiarMapa from "../../../Componets/Map/Limpiar";

const Mapa = () => {
  const ValleduparCenter = [10.470574, -73.254137];
  const [Puntos, setPuntos] = useState([]);
  const { Geolocation, setGeolocation } = useContext(GeolocationContext);
  const [Error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        const initialPoint = [position.coords.latitude, position.coords.longitude];
        setGeolocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        setPuntos([initialPoint]);
        setError(null);
      },
      function(error) {
        console.log(error);
        setError(null);
      },
      {
        enableHighAccuracy: true
      }
    );
  }, [setGeolocation]);

 
  const limiteValledupar = latLngBounds(
    [10.412101, -73.295329],
    [10.517931, -73.201259]
  );

  return (
   
      <MapContainer
        center={ValleduparCenter}
        zoom={13}
        scrollWheelZoom={true}
        maxBounds={limiteValledupar}
        maxBoundsViscosity={1.0}
        minZoom={13}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CrearMarcador/>
        <TrazarRuta/>
        <BotonMapa/>
        <BtnLimpiar/>
      </MapContainer>
    
  );
}

export default Mapa;
