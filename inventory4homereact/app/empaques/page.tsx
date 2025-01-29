"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Typography, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useEffect, useState } from "react";
import apiServices from "../Services/apiServices";
import FormEmpC from "../Componentes/FormEmpC";
import FormEmpU from "../Componentes/FormEmpU";
import FormEmpD from "../Componentes/FormEmpD";

// Definir las interfaces
interface empMain {
  idTypeStock: number;
  typeStockName: string;
  active: boolean;
}

interface empApiMain {
  success: boolean;
  data: empMain[];
}

const Empaques: React.FC = () => {
  // Datos actualizados

  // Estado para la respuesta de la API
  const [responseAPI, setResponseAPI] = useState<empApiMain | null>(null);
  // Estado para almacenar la lista de empaques
  const [mainEmp, setMainEmp] = useState<empMain[]>([]);

  // Estado para el diálogo del formulario
  const [openDialog, setOpenDialog] = useState(false);
  const [activeForm, setActiveForm] = useState<"create" | "update" | "delete" | null>(null);

  // Función para traer los datos de la API
  const getEmpaques = async () => {
    try {
      // Llamada a la API usando Axios
      // setResponseAPI (await apiServices.getData("Empaques/ReadEmps"));
      const prueba = await apiServices.getData("Empaques/ReadEmps") as empApiMain;
      setResponseAPI(prueba);
      setMainEmp(prueba.data);
      console.log(prueba);
      console.log(responseAPI);
      console.log(mainEmp);
      
      //setMainEmp(responseAPI?.data); // Actualizar los datos de la tabla
    } catch (error) {
      console.error('ERROR AL TRAER DATOS:', error);
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
  };

  const columns: GridColDef[] = [
    { field: "idTypeStock", headerName: "Id", width: 70 },
    { field: "typeStockName", headerName: "Nombre de Empaque", width: 300 },
    { 
      field: "active", 
      headerName: "Activo", 
      width: 100,
      renderCell: (params) => (
        <span>{params.value ? "Sí" : "No"}</span>
      ),
    },
  ];

 // Llamar a la función al montar el componente
 useEffect(() => {
  getEmpaques();
}, []); // El array vacío asegura que solo se ejecute una vez al montar el componente

useEffect(() => {
  console.log("responseAPI ha cambiado:", responseAPI);  // Esto se ejecutará cuando `responseAPI` cambie
}, [responseAPI]);

useEffect(() => {
  console.log("mainEmp ha cambiado:", mainEmp);  // Esto se ejecutará cuando `responseAPI` cambie
}, [mainEmp]);

  return (
    <div style={{ height: 400, width: "75%", margin: "0 auto", display: "block" }}>
      <br/>
      <Typography variant="h5" gutterBottom>
        Empaques
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
      <DataGrid rows={mainEmp} columns={columns} getRowId={(row) => row.idTypeStock} />
        {/* Dialog Dinámico */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {activeForm === "create" && "Agregar Nuevo Empaque"}
          {activeForm === "update" && "Editar Empaque"}
          {activeForm === "delete" && "Eliminar Empaque"}
        </DialogTitle>
        <DialogContent>
          {activeForm === "create" && <FormEmpC />}
          {activeForm === "update" && <FormEmpU />}
          {activeForm === "delete" && <FormEmpD />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="error" variant="contained">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Empaques;

