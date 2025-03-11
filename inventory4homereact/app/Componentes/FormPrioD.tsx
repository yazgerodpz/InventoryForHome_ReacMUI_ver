"use client";
import React, { useState } from 'react';
import { Typography, TextField, Button, Box, FormControlLabel, Switch } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
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

const FormPrioD: React.FC<FormProps> = ({ onClose }) => {
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

    // Funcion de busqueda por id
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
                setAlertMessage("Regla de prioridad encontrada");
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

    const handleDelete = async () => {
        if (searchId === '' || typeof searchId !== 'number') {
            setAlertMessage('Por favor, ingresa un ID válido para eliminar.');
            setAlertSeverity('warning');
            setOpenAlert(true);
            return;
        }

        try {
            const response = await apiServices.deleteData<{
                success: boolean;
                data: prioMain;
            }>(`Prioridades/DelPriosById/${searchId}`);

            if (response.success) {
                setAlertMessage(`Regla de prioridad eliminada correctamente.`);
                setAlertSeverity('success');
                setOpenAlert(true);
                setFormData(initialState); // Limpia los datos en pantalla
                setTimeout(() => {
                    onClose(); // Cerrar formulario después de 7 segundos
                }, 1300);
            } else {
                setAlertMessage('No se pudo eliminar la regla.');
                setAlertSeverity('error');
                setOpenAlert(true);
            }
        } catch (error) {
            console.error("Error al eliminar la regla:", error);
            setAlertMessage('Ocurrió un error al intentar eliminar la regla.');
            setAlertSeverity('error');
            setOpenAlert(true);
        }
    };

    const handleCancel = () => {
        setFormData(initialState); // Resetear los campos del formulario
        onClose(); // Cerrar el diálogo
    };

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Formulario eliminar regla de prioridad
            </Typography>
            <div>
                {/* <label>Search by ID:</label>
                <input
                    type="number"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value ? Number(e.target.value) : '')}
                /> */}
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
                />
                <Button type="button" onClick={handleSearch} variant="contained" startIcon={<SearchIcon />}>Buscar</Button>
            </div>
            <br />
            {formData && (
                <div>
                    <h3>TypePrioritary Details:</h3>
                    <br />
                    <p>
                        <strong>Type Prioritary Name:</strong> {formData.typePrioritaryName}
                    </p>
                    <br />
                    <p>
                        <strong>Description:</strong> {formData._Description}
                    </p>
                    <br />
                    <p>
                        <FormControlLabel
                            control={
                                <Switch
                                    id="active"
                                    name="active"
                                    checked={formData.active}
                                    readOnly
                                />
                            }
                            label="Activo"
                        />
                    </p>
                    <br />
                    <Button color="secondary" type="button" onClick={handleDelete} variant="contained" startIcon={<DeleteIcon />} className="button-spacing">
                        Delete
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
            )}
        </div>
    );
};

export default FormPrioD;
