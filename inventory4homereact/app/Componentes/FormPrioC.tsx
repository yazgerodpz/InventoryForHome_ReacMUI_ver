"use client";
import { Button, FormControlLabel, Switch, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import apiServices from "../Services/apiServices";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

// Definir las interfaces
interface FormProps {
  onClose: () => void;
}

interface formP {
  idTypePrioritary: number
  typePrioritaryName: string;
  _Description: string;
  active: boolean;
}

const FormPrioC: React.FC<FormProps> = ({ onClose }) => {

  const [formData, setFormData] = useState<formP>({
    idTypePrioritary: 0,
    typePrioritaryName: "",
    _Description: "",
    active: true, // Valor predeterminado para el campo Active
  });

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const [openAlert, setOpenAlert] = useState(false);
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

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
      active: e.target.checked,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Aquí puedes agregar la lógica para enviar los datos al servidor o hacer alguna otra acción

    try {
      const response = await apiServices.postData<{
        success: boolean;
        data: formP;
      }>("Prioridades/CrearPrios/nuevoReglaPrio", formData);
      console.log('Regla de prioridad creada:', response);
      if (response.success) {
        //Alerta
        setAlertMessage("Nuevo empaque creado exitosamente");
        setAlertSeverity("success");
        setOpenAlert(true);
        // se reinicia el formulario
        setFormData({ idTypePrioritary: 0, typePrioritaryName: "", _Description: "", active: true });
        setTimeout(() => {
          onClose(); // Cerrar formulario después de 7 segundos
        }, 1300);
      } else {
        setAlertMessage("Error al crear el empaque");
        setAlertSeverity("error");
        setOpenAlert(true);
      }
    } catch (error) {
      console.error("Error al enviar datos:", error);
      setAlertMessage("Error al crear el nuevo empaque. Revisa la consola para más detalles.");
      setAlertSeverity("error");
      setOpenAlert(true);
    }
  };

  const handleCancel = () => {
    // se renicia el formulario
    setFormData({
      idTypePrioritary: 0,
      typePrioritaryName: "",
      _Description: "",
      active: true,
    });
    // Aquí puedes agregar la lógica para cerrar el formulario o hacer alguna otra acción
    onClose(); // Cerrar el diálogo
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Formulario Crear regla de prioridad
      </Typography>
      <div>
        <TextField
          id="typePrioritaryName"
          label="Nombre de la nueva regla"
          name="typePrioritaryName"
          value={formData.typePrioritaryName}
          onChange={handleChange}
          variant="outlined"
          required
          style={{ marginTop: '10px' }}
        />
      </div>
      <div>
        <TextField
          id="_Description"
          label="Descripción"
          name="_Description"
          value={formData._Description}
          onChange={handleChange}
          variant="outlined"
          required
          multiline
          rows={4} // Puedes ajustar el número de filas visibles
          fullWidth // Para que ocupe todo el ancho disponible
          style={{ marginTop: '10px' }}
        />
      </div>
      <FormControlLabel
        control={
          <Switch
            id="active"
            name="active"
            checked={formData.active}
            onChange={handleCheckboxChange} />
        }
        labelPlacement="start"
        label="Activo" />

      <div>
        <Button color="success" type="submit" variant="contained" startIcon={<SaveIcon />} className="button-spacing">
          Guardar
        </Button>
        <Button color="error" type="button" onClick={handleCancel} variant="contained" startIcon={<CancelIcon />}>
          Cancelar
        </Button>
        <Snackbar open={openAlert} autoHideDuration={11000} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity={alertSeverity} sx={{ width: '100%' }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </div>
    </form>
  );
};

export default FormPrioC;