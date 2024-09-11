import React, { useContext, useEffect, useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,Chip, Tooltip, getKeyValue} from "@nextui-org/react";
import {EyeIcon} from "../Pages/datos/EyeIcon";
import Tarjeta from "../Vista/Tarjeta";
import { TiDeleteOutline } from "react-icons/ti";
import { columnsPoints } from "./datos/dataMisruta";
import L, { latLng, marker } from 'leaflet';
import axios from "axios";
import { PuntodeInteres } from "../../Models/PuntodeInteres";
import { useMap } from "react-leaflet";
import { PuntosDeInteresContext } from "../Context/PuntosDeInteresContext";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const PuntoIntere = () => {
    const API = 'http://localhost:5285/api/Puntodeinteres/Obtener';
    const [PuntosInteres, setPuntosInteres] = useState([]);
    const {setPuntosDeInteres} = useContext(PuntosDeInteresContext);


    const TraerPuntosInteres = async () => {
      await axios.get(API).
       then(res => {
         if(res.status === 200){
            console.log(res.data);
            const puntointeres = res.data.map(puntoI => new PuntodeInteres(puntoI.id, puntoI.nombre,puntoI.latitud, puntoI.longitud));
            setPuntosInteres(puntointeres);
         }
       })
    }


    useEffect(() => {
      if(PuntosInteres)TraerPuntosInteres();
    },[])

    const renderCell = React.useCallback((PuntosInteres, columnKey) => {
    const cellValue = PuntosInteres[columnKey];

      switch (columnKey) {
         case "name":
        return (
          <Chip>
            {PuntosInteres.nombre}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip color="danger" content="Ver punto en el mapa">
              <span className="text-sm text-danger cursor-pointer active:opacity-50" onClick={() => setPuntosDeInteres(PuntosInteres)}>
               <EyeIcon/>
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);


  if(PuntosInteres){
  return (
  <Table classNames={{
        base: "max-h-[550px] overflow-y-scroll",
        table: "overflow-auto",
      }}>
      <TableHeader columns={columnsPoints}>
        {(column) => (
          <TableColumn  key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={PuntosInteres}>
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
export default PuntoIntere;