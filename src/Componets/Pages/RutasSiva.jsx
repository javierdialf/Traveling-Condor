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

export default function  RutasSiva() {

    const API = 'http://localhost:5285/api/Rutas/rutasUsuario';

      const [rutasSIVA, setRutasSIVA] = useState([]);
      const {RutaDibujar, setRutaDibujar} = useContext(RutaDibujarContext);
  
      const manejadorPuntos = async () => {
          await axios.post(API, { IdUsuario: 3 })
          .then(res => {
            if (res.status === 200) {
              console.log(res.data);
              const rutas = res.data.map(ruta => new Ruta(ruta.id, ruta.nombre, ruta.puntosRutas, ruta.usuarioId));
              setRutasSIVA(rutas);
            }
          })
      };
      
  
     
    useEffect(() => {
      if(rutasSIVA) manejadorPuntos();
    },[]);


    const ObtenerRuta = (ruta) => {
      if(ruta) setRutaDibujar(ruta);
      console.log(ruta);
    }


    const renderCell = useCallback((rutasSIVA, columnKey) => {
      const cellValue = rutasSIVA[columnKey];
    
      switch (columnKey) {
        case "name":
          return (
            <Chip>
              {rutasSIVA.nombre}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => ObtenerRuta(rutasSIVA.puntosRutas)}>
              <EyeIcon />
              </span>
            </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    }, []);

 if(rutasSIVA){
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
        <TableBody items={rutasSIVA}>
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
