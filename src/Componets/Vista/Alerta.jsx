import React, { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link}from "@nextui-org/react";
import { TiDeleteOutline } from "react-icons/ti";

const Alerta = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const {setNombre, nombre, Avisale} = props;

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const manejadorInputNombre = async (e) => {
    await setNombre(e.target.value);
    console.log(nombre)
  }

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      classNames={{
        backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
    >
       <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">RUTA</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <p> </p>
                  }
                  label="Nombre"
                  placeholder="Ingresa el nombre de la ruta"
                  variant="bordered"
                  value={nombre}
                  onChange={manejadorInputNombre}
                />

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={() => {
                  if(nombre.length > 4) Avisale();
                  setIsOpen(false);
                }}>
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
    </Modal>
  );
};

export default Alerta;
