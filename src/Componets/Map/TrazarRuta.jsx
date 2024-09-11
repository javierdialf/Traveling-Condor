import { useContext, useEffect, useRef, useState } from "react";
import L from 'leaflet';
import 'leaflet-routing-machine';
import { useMap } from "react-leaflet";
import { RutaDibujarContext } from "../Context/RutaDibujarContext";
import { PuntosContext } from "../Context/PuntosContext";

const TrazarRuta = () => {
    const map = useMap();
    const controlRutaRef = useRef(null);
    const {RutaDibujar} = useContext(RutaDibujarContext);
    const {Puntos} = useContext(PuntosContext);

    useEffect(() => {
        if (Puntos && Puntos.length > 1) {

            if (controlRutaRef.current) {
                controlRutaRef.current.remove();
            }

            controlRutaRef.current = L.Routing.control({
                waypoints: Puntos,
                lineOptions: {
                    styles: [
                        {
                            color: 'purple',
                            weight: 7,
                            opacity: 0.5,
                            dashArray: '5 10'
                        },
                    ],
                },
                routeWhileDragging: false,
                addWaypoints: false,
                draggableWaypoints: true,
                fitSelectedRoutes: true,
                showAlternatives: false,
                collapsible: true,
                show: false
            }).addTo(map);
            console.log(Puntos);

            return () => {
                if (controlRutaRef.current) {
                    controlRutaRef.current.remove();
                    controlRutaRef.current = null;
                }
            };
           
        }
       
    }, [map, Puntos]);


    useEffect(() => {
        if (RutaDibujar) {
            console.log(RutaDibujar);
            if (controlRutaRef.current) {
                controlRutaRef.current.remove();
            }

            controlRutaRef.current = L.Routing.control({
                waypoints: RutaDibujar.map(punto => ({
                    lat: punto.latitud,
                    lng: punto.longitud
                })),
                lineOptions: {
                    styles: [
                        {
                            color: 'blue',
                            weight: 7,
                            opacity: 0.5,
                        },
                    ],
                },
                routeWhileDragging: false,
                addWaypoints: false,
                draggableWaypoints: true,
                fitSelectedRoutes: true,
                showAlternatives: false,
                collapsible: true,
                show: false
            }).addTo(map);

            return () => {
                if (controlRutaRef.current) {
                    controlRutaRef.current.remove();
                    controlRutaRef.current = null;
                }
            };
           
        }
    },[RutaDibujar])
    return null;
};

export default TrazarRuta;
