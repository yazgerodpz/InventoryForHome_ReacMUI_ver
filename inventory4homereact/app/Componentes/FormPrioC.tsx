"use client";
import { Button, FormControlLabel, Switch, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

interface TypePrioritary {
  TypePrioritaryName: string;
  Description: string;
  Active: boolean;
}

const FormPrioC: React.FC = () => {

  const [formData, setFormData] = useState<TypePrioritary>({
    TypePrioritaryName: '',
    Description: '',
    Active: true, // Valor predeterminado para el campo Active
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Aquí puedes agregar la lógica para enviar los datos al servidor o hacer alguna otra acción
  };

  const handleCancel = () => {
    setFormData({
      TypePrioritaryName: '',
      Description: '',
      Active: true,
    });
    // Aquí puedes agregar la lógica para cerrar el formulario o hacer alguna otra acción
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Formulario Crear regla de prioridad
      </Typography>
      <div>
        <TextField
          id="TypePrioritaryName"
          label="Nombre de la nueva regla"
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

export default FormPrioC;
