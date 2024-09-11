import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue} from "@nextui-org/react";
import {EditIcon} from "../Pages/datos/EditIcon";
import {DeleteIcon} from "../Pages/datos/DeleteIcon";
import {EyeIcon} from "../Pages/datos/EyeIcon";
import Tarjeta from "../Vista/Tarjeta";
import { TiDeleteOutline } from "react-icons/ti";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function PuntoIntere() {
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            name={cellValue}
          >
          </User>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit user">
              <span className="text-sm text-default-400 cursor-pointer active:opacity-50">
              <Tarjeta icono={<EditIcon />} titulo="prueba" texto0="1" texto1="2" texto2="3" /> 
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-sm text-danger cursor-pointer active:opacity-50">
               <Tarjeta icono={<DeleteIcon/>} titulo="prueba" texto0="1" texto1="2" texto2="3" />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
   
  <Table classNames={{
        base: " overflow-auto ",
        table: "overflow-auto",
      }}>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn  key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={users}>
        {(item) => (
          <TableRow className="textolargo" key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
 
  );
}
