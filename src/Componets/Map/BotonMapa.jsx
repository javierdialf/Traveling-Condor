import { useEffect, useContext, useRef, useState, useCallback } from "react";
import { useMap } from "react-leaflet";
import L,{clearLayers,removeLayer} from "leaflet";
import axios from 'axios';
import { RutaEnviar } from '../../Models/Ruta';
import add from '../../Assets/agregar.png';
import { UserContext } from '../Context/UserContext';
import { GeolocationContext } from '../Context/GeolocationContext';
import Alerta from "../Vista/Alerta";
import { Alert } from "bootstrap";
import { PuntosContext } from "../Context/PuntosContext";

const BotonMapa = () => {
  //console.log(Puntos);
  const map = useMap();
  const API_POST = 'http://localhost:5285/api/Rutas/agregar';
  const { user } = useContext(UserContext);
  const {Puntos, setPuntos} = useContext(PuntosContext);
  const controlBton = useRef(null);
  const PuntosRef = useRef(Puntos);
  const [alerta, setAlerta] = useState({ show: false, titulo: '', texto0: '', texto1: '', texto2: '' });
  const [nombre, setNombre] = useState('');
  const NombreRef = useRef(nombre);
  
  const MostraAlerta = (titleMostrar,iconB,texto) => {
    swal({
        title: titleMostrar,
        text: texto,
        icon: iconB,
        button:'Aceptar'
    });
}

    const LimpiarMapa = () => {
     clearLayers;
    }

  useEffect(() => {
    if(Puntos){
      PuntosRef.current = Puntos.map(punto => ({
        latitud: punto[0],
        longitud: punto[1]
      }));
    }
  }, [Puntos])

  useEffect(() => {
    NombreRef.current = nombre
  },[nombre, setNombre]);


  const GuardarRuta = async () => {
   if(PuntosRef){
    const rutaAgregar = new RutaEnviar(NombreRef.current, PuntosRef.current, user.id);

    axios.post(API_POST, rutaAgregar, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status === 200) {
          MostraAlerta('Ruta Guardada','success','Ruta Guardada con exito');
          LimpiarMapa();
          setPuntos([]);
          setNombre('');
          setAlerta({show:false});
          //vamos a vaciar esa vaina cada que se haga un envio exitoso
        }
      })
      .catch(error => {
        MostraAlerta('Error','error','Ocurrio un problema, No fue posible guardar la Ruta');
        setAlerta({show:false});
      });
   } 
}



  useEffect(() => {
    let customControl = L.Control.extend({
      options: {
        position: 'bottomleft'
      },

            onAdd: function (map) {
              let container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
              container.style.backgroundImage = `url(${add})`;
              container.style.backgroundSize = "contain";
              container.style.width = '30px';
              container.style.height = '30px';
              container.style.borderRadius = '50%';
              container.style.border = '2px solid aquamarine'

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


    const control = new customControl()
    map.addControl(control);
    controlBton.current = control;

    return () => {
      if(control)map.removeControl(control);
    }
    
  }, [map]);



  
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