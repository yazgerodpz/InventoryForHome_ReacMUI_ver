import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'age', headerName: 'Age', type: 'number', width: 110 },
  { field: 'active', headerName: 'Active', type: 'boolean', width: 110 },
];

const rows = [
  { id: 1, name: 'John Doe', age: 35, active: true },
  { id: 2, name: 'Jane Smith', age: 42, active: false },
  { id: 3, name: 'Alex Johnson', age: 29, active: true },
];

export default function Inventario() {
  return (
    <Box
      sx={{
        height: 400,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </Box>
  );
}
