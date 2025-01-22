"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import apiServices from "../Services/apiServices";

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
      </Typography>
      <DataGrid rows={mainEmp} columns={columns} getRowId={(row) => row.idTypeStock} />
    </div>
  );
};

export default Empaques;

