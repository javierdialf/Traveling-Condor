import { useEffect, useContext, useRef, useState, useCallback } from "react";
import { useMap } from "react-leaflet";
import L,{clearLayers,removeLayer} from "leaflet";
import axios from 'axios';
import { RutaEnviar } from '../../Models/Ruta';
import iconAdd from '../../Assets/btnAd.png';
import { UserContext } from '../Context/UserContext';
import { GeolocationContext } from '../Context/GeolocationContext';
import Alerta from "../Vista/Alerta";
import { Alert } from "bootstrap";

const BotonMapa = ({addPuntos, puntos}) => {
  //console.log(puntos);
  const map = useMap();
  const API_POST = 'http://localhost:5285/api/Rutas/agregar';
  const { user } = useContext(UserContext);
  const controlBton = useRef(null);
  const {Geolocation} = useContext(GeolocationContext);
  const puntosRef = useRef(puntos);
  const [alerta, setAlerta] = useState({ show: false, titulo: '', texto0: '', texto1: '', texto2: '' });
  const [nombre, setNombre] = useState('');
  const NombreRef = useRef(nombre);
  

  console.log(nombre);


    function LimpiarMapa() {
      clearLayers;
    }

  useEffect(() => {
    puntosRef.current = puntos.map(punto => ({
      latitud: punto[0],
      longitud: punto[1]
    }));
  }, [puntos, addPuntos])

  useEffect(() => {
    NombreRef.current = nombre
  },[nombre, setNombre])


  useEffect(() => {
    if(controlBton.current) return;
    var customControl = L.Control.extend({
      options: {
        position: 'bottomright'
      },

            onAdd: function (map) {
              var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
              container.style.backgroundImage = `url(${iconAdd})`;
              container.style.backgroundSize = "30px 30px";
              container.style.width = '30px';
              container.style.height = '30px';
              container.style.borderRadius = '50%';
              container.style.border = 'none'

              L.DomEvent.disableClickPropagation(container);
              L.DomEvent.on(container,'click', () => {
                setAlerta({
                  show: true,
                  titulo: "",
                  texto0: "",
                  texto1: "",
                  texto2: ""
                });
              });
              
              return container;
            }
          });

    map.addControl(new customControl());
    controlBton.current = new customControl();
  }, []);



  const GuardarRuta = async () => {
      const rutaAgregar = new RutaEnviar(NombreRef.current, puntosRef.current, user.id);
  
    axios.post(API_POST, rutaAgregar, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status === 200) {
          setAlerta({
            show: true,
            titulo: "MI LLAVE",
            texto0: "TU RUTA",
            texto1: "ACABA DE",
            texto2: "Guardarse con éxito!"
          });
          LimpiarMapa();
          addPuntos([]);
          setNombre('');
          //vamos a vaciar esa vaina cada que se haga un envio exitoso
        }
      })
      .catch(error => {
        setAlerta({
          show: true,
          titulo: "MI LLAVE",
          texto0: "TU RUTA",
          texto1: "NO SE PUDO",
          texto2: "Guardar!" + error.message
        });
      }); 
  }
  //pa que le avise al otro
  const Avisale = useCallback (GuardarRuta,[]);

  return(
    <>
    {alerta.show && (
      <Alerta 
        titulo={alerta.titulo} 
        texto0={alerta.texto0}
        texto1={alerta.texto1}
        texto2={alerta.texto2}
        setNombre={setNombre}
        nombre={nombre}
        Avisale={Avisale}
      />
    )}
  </>
  );
}

export default BotonMapa;