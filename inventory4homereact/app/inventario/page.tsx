"use client";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import apiServices from "../Services/apiServices";
import React, { useState, useEffect } from 'react';

interface DataItem {
  idItem: number;
  itemName: string;
  stock: number;
  idTypePrioritary: number;
  idTypeStock: number;
  purchesDate: Date; // Puedes usar string si prefieres manejarlo como una cadena
  expirationDate: Date; // Lo mismo aquí
  active: boolean
}

interface ResponseApi { //OBJETO DE RESPUESTA API
  success: boolean;
  data: DataItem[];
}

const Inventario: React.FC = () => {

  const [responseAPI, setResponseAPI] = useState<ResponseApi | null>(null); // Estado para la respuesta de la API
  const [dataInventario, setDataInventario] = useState<DataItem[]>([]); // Estado para los datos del inventario

  // Función para obtener datos del inventario
  const getInventario = async () => {
    try {
      const response = await apiServices.getData<ResponseApi>('Inventario/ReadInvs');
      setResponseAPI(response); // Almacena la respuesta completa
      setDataInventario(response.data); // Extrae y almacena los datos del inventario
    } catch (error) {
      console.error('ERROR AL TRAER DATOS EN', error);
    }
  };

  const columns: GridColDef[] = [
    { field: "idItem", headerName: "ID", width: 70 },
    { field: "itemName", headerName: "Artículo", width: 150 },
    { field: "stock", headerName: "Cantidad", type: "number", width: 120 },
    { field: "typeStockName", headerName: "Empaque", width: 120 },
    { field: "typePrioritaryName", headerName: "Regla de Prioridad", width: 150 },
    {
      field: "purchesDate",
      headerName: "Fecha de Compra",
      type: "date",
      width: 150,
      valueGetter: (value, row) => new Date(row.purchesDate),
    },
    {
      field: "expirationDate",
      headerName: "Fecha de Expiración",
      type: "date",
      width: 180,
      valueGetter: (value, row) => new Date(row.expirationDate),
    },
    // {
    //   field: "active",
    //   headerName: "Activo",
    //   width: 100,
    //   renderCell: (params) => (<span>{params.value ? "Sí" : "No"}</span>),
    // },
  ];

  // Ejecuta la función al montar el componente
  useEffect(() => {
    getInventario();
  }, []); // [] asegura que solo se ejecuta al montar

  useEffect(() => {
    console.log("responseAPI ha cambiado:", responseAPI);  // Esto se ejecutará cuando `responseAPI` cambie
  }, [responseAPI]);
  
  useEffect(() => {
    console.log("dataInventario ha cambiado:", dataInventario);  // Esto se ejecutará cuando `responseAPI` cambie
  }, [dataInventario]);

  return (
    <div style={{ height: 400, width: "75%", margin: "0 auto", display: "block" }}>
      <br/>
      <Typography variant="h5" gutterBottom>
        Inventario
      </Typography>
      <DataGrid
        rows={dataInventario}
        columns={columns}
        getRowId={(row) => row.idItem}
      />
    </div>
  );
};

export default Inventario;
