"use client";
import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Typography, Button, Stack, Dialog, DialogTitle, DialogContent } from "@mui/material";
import apiServices from "../Services/apiServices";
import FormPrioC from '../Componentes/FormPrioC';
import FormPrioU from '../Componentes/FormPrioU';
import FormPrioD from '../Componentes/FormPrioD';

interface prioMain {
  idTypePrioritary: number;
  typePrioritaryName: string;
  _Description: string;
  active: boolean;
}

interface prioApiMain { //estructura del objeto que se trae del api
  success: boolean;
  data: prioMain[];
}


const ReglaPrio: React.FC = () => {

  const [responseAPI, setResponseAPI] = useState<prioApiMain | null>(null); // Estado para la respuesta de la API
  const [mainPrio, setMainPrio] = useState<prioMain[]>([]); // Estado para la lista de prioridades

  // Estado para el diálogo del formulario
  const [openDialog, setOpenDialog] = useState(false);
  const [activeForm, setActiveForm] = useState<"create" | "update" | "delete" | null>(null);

  // Función para obtener datos de prioridades
  const getPrioridades = async () => {
    try {
      const response = await apiServices.getData('Prioridades/ReadPrios') as prioApiMain;
      setResponseAPI(response); // Almacena la respuesta completa
      setMainPrio(response.data); // Extrae y almacena los datos de prioridades
    } catch (error) {
      console.error('ERROR AL TRAER DATOS EN', error);
    }
  };

  // Funciones para abrir los diálogos según el formulario
  const handleOpenDialog = (formType: "create" | "update" | "delete") => {
    setActiveForm(formType);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setActiveForm(null);
    getPrioridades();
  };

  const columns: GridColDef[] = [
    { field: "idTypePrioritary", headerName: "ID", width: 70 },
    { field: "typePrioritaryName", headerName: "Regla de Prioridad", width: 150 },
    { field: "_Description", headerName: "Descripción", width: 250 },
    {
      field: "active",
      headerName: "Activo",
      width: 100,
      renderCell: (params) => (<span>{params.value ? "Sí" : "No"}</span>)
    },
  ];

  // Ejecuta la función al montar el componente
  useEffect(() => {
    getPrioridades();
  }, []); // [] asegura que solo se ejecuta al montar

  useEffect(() => {
    console.log("responseAPI ha cambiado:", responseAPI);  // Esto se ejecutará cuando `responseAPI` cambie
  }, [responseAPI]);

  useEffect(() => {
    console.log("mainPrio ha cambiado:", mainPrio);  // Esto se ejecutará cuando `responseAPI` cambie
  }, [mainPrio]);

  return (
    <div style={{ height: 400, width: "75%", margin: "0 auto", display: "block" }}>
      <br />
      <Typography variant="h5" gutterBottom>
        Reglas de prioridad
        {/* Contenedor para los botones */}
        <Stack direction="row" spacing={2} justifyContent="flex-end" marginBottom={2}>
          <Button variant="contained" color="primary" onClick={() => handleOpenDialog("create")}>
            Agregar
          </Button>
          <Button variant="contained" color="warning" onClick={() => handleOpenDialog("update")}>
            Editar
          </Button>
          <Button variant="contained" color="error" onClick={() => handleOpenDialog("delete")}>
            Eliminar
          </Button>
        </Stack>
        {/* {Tabla} */}
      </Typography>
      <DataGrid rows={mainPrio} columns={columns} getRowId={(row) => row.idTypePrioritary} />
      {/* Dialog Dinámico */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {activeForm === "create" && "Agregar Nueva Reglad de Prioridad"}
          {activeForm === "update" && "Editar Regla de Prioridad"}
          {activeForm === "delete" && "Eliminar Regla de Prioridad"}
        </DialogTitle>
        <DialogContent>
          {activeForm === "create" && <FormPrioC onClose={handleCloseDialog} />}
          {activeForm === "update" && <FormPrioU onClose={handleCloseDialog} />}
          {activeForm === "delete" && <FormPrioD />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReglaPrio;
