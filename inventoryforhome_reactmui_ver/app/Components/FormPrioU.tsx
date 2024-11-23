"use client";
import { Typography, TextField, Button, FormControlLabel, Switch } from '@mui/material';
import React, { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';

interface TypePrioritary {
  IdTypePrioritary: number; // Nuevo campo añadido
  TypePrioritaryName: string;
  Description: string;
  Active: boolean;
}

const FormPrioU: React.FC = () => {
  const [formData, setFormData] = useState<TypePrioritary>({
    IdTypePrioritary: 0, // Valor predeterminado
    TypePrioritaryName: '',
    Description: '',
    Active: true, // Valor predeterminado para el campo Active
  });

  const [searchId, setSearchId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      Active: e.target.checked,
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchId(Number(e.target.value));
  };

  const handleSearch = async () => {
    if (searchId !== null) {
      // Aquí puedes hacer la llamada a la API o a la base de datos para obtener el registro por Id
      // Por ejemplo, simulemos con un objeto:
      if (searchId === 1) { // Simulamos que el ID 1 existe
        const dataFromApi = {
          IdTypePrioritary: 1,
          TypePrioritaryName: 'Alta',
          Description: 'Prioridad alta',
          Active: true,
        };
        setFormData(dataFromApi);
      } else if (searchId === 2) { // Simulamos que el ID 2 existe
        const dataFromApi = {
          IdTypePrioritary: 2,
          TypePrioritaryName: 'Baja',
          Description: 'Prioridad baja',
          Active: false,
        };
        setFormData(dataFromApi);
      } else {
        // Alerta si no se encuentra el ID
        setFormData({
          IdTypePrioritary: 0,
          TypePrioritaryName: '',
          Description: '',
          Active: true,
        });
        alert('ID no encontrado');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Aquí puedes agregar la lógica para enviar los datos al servidor o hacer alguna otra acción
  };

  const handleCancel = () => {
    setFormData({
      IdTypePrioritary: 0,
      TypePrioritaryName: '',
      Description: '',
      Active: true,
    });
    setSearchId(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Formulario actualizar reglas de prioridad
      </Typography>
      <div>
        {/* <label htmlFor="searchId">Buscar por ID:</label>
        <input
          type="number"
          id="searchId"
          value={searchId ?? ''}
          onChange={handleSearchChange}
        /> */}
        <TextField
          id="searchId"
          label="Buscar por ID"
          type="number"
          value={searchId ?? ''}
          onChange={handleSearchChange}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <Button type="button" onClick={handleSearch} variant="contained" startIcon={<SearchIcon />}>Buscar</Button>
      </div>

      <div>
        <TextField
          id="TypePrioritaryName"
          label="Nueva regla"
          name="TypePrioritaryName"
          value={formData.TypePrioritaryName}
          onChange={handleChange}
          variant="outlined"
          required
          style={{ marginTop: '10px' }}
        />
      </div>
      <div>
        <TextField
          id="Description"
          label="Descripción"
          name="Description"
          value={formData.Description}
          onChange={handleChange}
          variant="outlined"
          required
          multiline
          rows={4} // Puedes ajustar el número de filas visibles
          fullWidth // Para que ocupe todo el ancho disponible
          style={{ marginTop: '10px' }}
        />
      </div>
      <div>
        <FormControlLabel control=
          {
            <Switch
              id="Active"
              name="Active"
              checked={formData.Active}
              onChange={handleCheckboxChange} />
          }
          labelPlacement="start"
          label="Activo" />
      </div>
      <div>
        <Button color="success" type="submit" variant="contained" startIcon={<SaveIcon />} className="button-spacing">
          Guardar
        </Button>
        <Button color="error" type="button" onClick={handleCancel} variant="contained" startIcon={<CancelIcon />}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default FormPrioU;
