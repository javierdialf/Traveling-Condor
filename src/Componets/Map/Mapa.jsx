import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { latLngBounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import TrazarRuta from "./TrazarRuta";
import CrearMarcador from "./Marcadores";
import { GeolocationContext } from "../Context/GeolocationContext";
import './mapa.css';
import BotonMapa from "./BotonMapa";
import { PuntosContext } from "../Context/PuntosContext";
import BtnLimpiar from './BtnLimpiar';
import PuntoIntere from "../Pages/PuntosIntere";
import CrearMarcadoresPersonalizados from "./MarcadoresPersonalizados";

const Mapa = () => {
  const ValleduparCenter = [10.470574, -73.254137];
  const {Puntos, setPuntos} = useContext(PuntosContext);
  const { Geolocation, setGeolocation } = useContext(GeolocationContext);
  const [Error, setError] = useState(null);

  useEffect(() => {
    if(Puntos.length < 1){
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
    }
  }, [setGeolocation,Puntos]);

  const addPuntos = (nuevoPunto) => {
    setPuntos(prevPuntos => [...prevPuntos, nuevoPunto]);
    console.log(Puntos);
  };

 
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
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"n
        />
         {PuntoIntere}
        <CrearMarcador addPuntos={addPuntos}/>
        <TrazarRuta/>
        <BotonMapa/>
        <BtnLimpiar/>
        <CrearMarcadoresPersonalizados/>
      </MapContainer>
    
  );
}

export default Mapa;
