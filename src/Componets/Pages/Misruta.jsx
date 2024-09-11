import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue} from "@nextui-org/react";
import {EditIcon} from "../Pages/datos/EditIcon";
import {DeleteIcon} from "../Pages/datos/DeleteIcon";
import {EyeIcon} from "../Pages/datos/EyeIcon";
import axios from 'axios';
import {columns} from "./datos/dataMisruta";
import { useState, useContext, useEffect,useCallback } from "react";
import Tarjeta from "../Vista/Tarjeta";
import { TiDeleteOutline } from "react-icons/ti";
import {Ruta} from '../../Models/Ruta';
import {UserContext} from '../Context/UserContext'
import { RutaDibujarContext } from "../Context/RutaDibujarContext";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function Misruta() {

    const API = 'http://localhost:5285/api/Rutas/rutasUsuario';
    const API_eliminar = 'http://localhost:5285/api/Rutas/Eliminar';
    const API_editar = 'http://localhost:5285/api/Rutas/editar';
  
      const [rutas, setRutas] = useState()
      const {user} = useContext(UserContext);
      const {RutaDibujar, setRutaDibujar} = useContext(RutaDibujarContext);

      const eliminarRuta = async (RutaId) => {
          await axios.delete(`${API_eliminar}?id=${RutaId}`)
          .then(res => {
           if(res.status === 204){
             console.log('eliminado');
           }
          })
        }
  
      const editarRuta = async (RutaId) => {
        const rutaEditar = new Ruta("alo",[{ latitud: 202020, longitud: 1000 }], user.id);
           await axios.put(`${API_editar}?idRuta=${RutaId}`,JSON.stringify(rutaEditar), { headers: {'Content-Type': 'application/json' }
          })
           .then(res => {
            if(res.status === 200){
              console.log('editado primo');
            }
           })
        }
  
        const manejadorPuntos = async () => {
       await axios.post(API, {"IdUsuario": user.id})
       .then(res => {
        if(res.status === 200){
          console.log(res.data);
          const rutas = res.data.map(ruta => new Ruta(ruta.id, ruta.nombre, ruta.puntosRutas, ruta.usuarioId));
          setRutas(rutas);
        }
       })
    }
  
    useEffect(() => {
      if(user.id)manejadorPuntos();
    },[user.id]);

    const ObtenerRuta = (ruta) => {
      if(ruta) setRutaDibujar(ruta);
      console.log(ruta);
    }

    const renderCell = useCallback((rutas, columnKey) => {
      const cellValue = rutas[columnKey];
    
      switch (columnKey) {
        case "name":
          return (
            <Chip>
              {rutas.nombre}
            </Chip>
          );
        case "status":
          return (
            <Chip className="capitalize" color={statusColorMap[cellValue]} size="sm" variant="flat">
              {cellValue && cellValue.nombre}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2"> 
              <Tooltip color="danger" content="Eliminar Ruta">
                <span className="text-sm text-danger cursor-pointer active:opacity-50" onClick={() => eliminarRuta(rutas.id)}>
                  <DeleteIcon/>
                </span>
              </Tooltip>

              <Tooltip content="Ver Ruta">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => ObtenerRuta(rutas.puntosRutas)}>
              <EyeIcon/>
              </span>
            </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    }, []);

 if(rutas){
  return (
    <Table classNames={{
          base: "max-h-[550px] overflow-y-scroll",
          table: "overflow-auto",
        }}>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn  key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={rutas}>
          {(item) => (
            <TableRow className="textolargo" key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
  );
 }
}
