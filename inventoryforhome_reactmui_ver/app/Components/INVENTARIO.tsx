import * as React from 'react';
import { DataGrid, GridColDef } from "@mui/x-data-grid";


export default function INVENTARIO () {
    const DataGridExample = () => {
        
        // Definición de columnas
        const columns: GridColDef[] = [
          { field: "id", headerName: "ID", width: 70 },
          { field: "name", headerName: "Nombre", width: 150 },
          { field: "quantity", headerName: "Cantidad", type: "number", width: 130 },
          {
            field: "price",
            headerName: "Precio",
            type: "number",
            width: 130,
          },
        ];

        // Datos de ejemplo
        const rows = [
          { id: 1, name: "Manzana", quantity: 10, price: 1.5 },
          { id: 2, name: "Plátano", quantity: 20, price: 0.9 },
          { id: 3, name: "Naranja", quantity: 15, price: 1.2 },
        ];
      
      
        return (
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </div>
        );
    };
}