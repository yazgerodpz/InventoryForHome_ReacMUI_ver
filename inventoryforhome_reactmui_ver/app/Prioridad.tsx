"use client";
import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";


const ReglaPrio = () => {
  // Datos de ejemplo
  const rows = [
    { id: 1, reglaPrioridad: "Alta", descripcion: "Máxima prioridad", activo: true },
    { id: 2, reglaPrioridad: "Media", descripcion: "Prioridad intermedia", activo: true },
    { id: 3, reglaPrioridad: "Baja", descripcion: "Mínima prioridad", activo: false },
  ];

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "reglaPrioridad", headerName: "Regla de Prioridad", width: 150 },
    { field: "descripcion", headerName: "Descripción", width: 250 },
    {
      field: "activo",
      headerName: "Activo",
      width: 100,
      renderCell: (params) => (
        <span>{params.row.activo ? "Sí" : "No"}</span>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );

  // return (
  //   <div style={{ height: 400, width: "100%" }}>
  //     <DataGrid
  //       rows={rows}
  //       columns={columns}
  //       pageSize={5}
  //       checkboxSelection
  //       disableSelectionOnClick
  //     />
  //   </div>
  // );
};

export default ReglaPrio;
