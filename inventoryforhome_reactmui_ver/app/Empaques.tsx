"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Typography } from "@mui/material";

const Empaques = () => {
  // Datos actualizados
  const rows = [
    { id: 1, empaque: "Caja", activo: true },
    { id: 2, empaque: "Bolsa", activo: false },
    { id: 3, empaque: "Palet", activo: true },
  ];

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "empaque", headerName: "Empaque", width: 150 },
    { 
      field: "activo", 
      headerName: "Activo", 
      width: 100,
      renderCell: (params) => (
        <span>{params.value ? "Sí" : "No"}</span>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Typography variant="h5" gutterBottom>
        Empaques
      </Typography>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
};

export default Empaques;

