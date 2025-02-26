"use client";
import { Typography, TextField, Button, FormControlLabel, Switch } from '@mui/material';
import React, { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import apiServices from '../Services/apiServices';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

// Definir las interfaces
interface FormProps {
  onClose: () => void;
}

interface prioMain {
  idTypePrioritary: number;
  typePrioritaryName: string;
  _Description: string;
  active: boolean;
}

interface prioApiMain { //estructura del objeto que se trae del api
  success: boolean;
  data: prioMain;
}

const FormPrioU: React.FC<FormProps> = ({ onClose }) => {
  const initialState: prioMain = {
    idTypePrioritary: 0, // Valor predeterminado
    typePrioritaryName: '',
    _Description: '',
    active: true, // Valor predeterminado para el campo Active
  };

  const [formData, setFormData] = useState<prioMain>(initialState);
  const [searchId, setSearchId] = useState<number | ''>(''); // Para buscar por id
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const [openAlert, setOpenAlert] = useState(false);
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      active: e.target.checked,
    });
  };

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchId(Number(e.target.value));
  // };

  const handleSearch = async () => {
    if (searchId === '') {
      setAlertMessage('Por favor, ingresa un ID.');
      setOpenAlert(true);
      return;
    }
    try {
      const response: prioApiMain = await apiServices.getData(`Prioridades/ReadPriosById/${searchId}`);

      if (response.success && response.data) {
        setFormData(response.data);
        setAlertMessage("hola");
        setOpenAlert(true);
      } else {
        setAlertMessage("ID no encontrado.");
        setFormData(initialState);
        setOpenAlert(true);
      }
    } catch (error) {
      console.error("Error en la búsqueda:", error);
      setAlertMessage("Ocurrió un error al buscar la regla.");
      setFormData(initialState);
      setOpenAlert(true);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Aquí puedes agregar la lógica para enviar los datos al servidor o hacer alguna otra acción
    try {
      const response = await apiServices.postData<{
        success: boolean;
        data: prioMain;
      }>("Prioridades/EditPrios/ActReglaPrio", formData);
      console.log('nueva regla de prioridad creada:', response);
      if (response.success) {
        //Alerta
        setAlertMessage("Regla de prioridad actualizada exitosamente");
        setAlertSeverity("success");
        setOpenAlert(true);
        // se reinicia el formulario
        setFormData({ idTypePrioritary: 0, typePrioritaryName: "", _Description: "", active: true });
        setTimeout(() => {
          onClose(); // Cerrar formulario después de 7 segundos
        }, 1300);
      } else {
        setAlertMessage("Error al actualizar la regla de prioridad");
        setAlertSeverity("error");
        setOpenAlert(true);
      }
    } catch (error) {
      console.error("Error al enviar datos:", error);
      setAlertMessage("Error al actualizar la regla de prioridad. Revisa la consola para más detalles.");
      setAlertSeverity("error");
      setOpenAlert(true);
    }
  };

  const handleCancel = () => {
    setFormData(initialState); // Resetear los campos del formulario
    onClose(); // Cerrar el diálogo
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Formulario actualizar reglas de prioridad
      </Typography>
      <div>
        <TextField
          id="searchId"
          label="Buscar por ID"
          type="number"
          value={searchId || ""}
          onChange={(e) => setSearchId(e.target.value ? parseInt(e.target.value) : "")}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        // variant="outlined"
        />
        <Button type="button" onClick={handleSearch} variant="contained" startIcon={<SearchIcon />}>Buscar</Button>
      </div>

      <div>
        <TextField
          id="typePrioritaryName"
          label="Nueva regla"
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
      <div>
        <FormControlLabel control=
          {
            <Switch
              id="active"
              name="active"
              checked={formData.active}
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
        <Snackbar open={openAlert} autoHideDuration={11000} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity={alertSeverity} sx={{ width: '100%' }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </div>
    </form>
  );
};

export default FormPrioU;
