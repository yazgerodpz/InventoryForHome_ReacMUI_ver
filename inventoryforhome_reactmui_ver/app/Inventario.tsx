"use client";
import React from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Typography } from "@mui/material";


const Inventario = () => {
  // Datos de ejemplo
  const rows: GridRowsProp = [
    {
      id: 1,
      articulo: "Manzana",
      cantidad: 50,
      empaque: "Caja",
      reglaPrioridad: "Alta",
      fechaCompra: "2024-11-01",
      fechaExpiracion: "2024-12-01",
      activo: true,
    },
    {
      id: 2,
      articulo: "Plátano",
      cantidad: 30,
      empaque: "Bolsa",
      reglaPrioridad: "Media",
      fechaCompra: "2024-10-15",
      fechaExpiracion: "2024-11-30",
      activo: true,
    },
    {
      id: 3,
      articulo: "Naranja",
      cantidad: 20,
      empaque: "Palet",
      reglaPrioridad: "Baja",
      fechaCompra: "2024-10-01",
      fechaExpiracion: "2024-11-20",
      activo: false,
    },
  ];

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "articulo", headerName: "Artículo", width: 150 },
    { field: "cantidad", headerName: "Cantidad", type: "number", width: 120 },
    { field: "empaque", headerName: "Empaque", width: 120 },
    { field: "reglaPrioridad", headerName: "Regla de Prioridad", width: 150 },
    // {
    //   field: "fechaCompra",
    //   headerName: "Fecha de Compra",
    //   type: "date",
    //   width: 150,
    //   valueGetter: (params) =>
    //     params.row.fechaCompra ? new Date(params.row.fechaCompra) : null, // Validación
    // },
    // {
    //   field: "fechaExpiracion",
    //   headerName: "Fecha de Expiración",
    //   type: "date",
    //   width: 180,
    //   valueGetter: (params) =>
    //     params.row.fechaExpiracion ? new Date(params.row.fechaExpiracion) : null, // Validación
    // },
    {
      field: "activo",
      headerName: "Activo",
      width: 100,
      renderCell: (params) => <span>{params.value ? "Sí" : "No"}</span>,
    },
  ];

  return (
    <div style={{ height: 500, width: "100%" }}>
      <Typography variant="h5" gutterBottom>
        Inventario
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default Inventario;
