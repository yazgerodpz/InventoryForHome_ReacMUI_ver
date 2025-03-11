"use client";
import React, { useState } from 'react';
import { Typography, TextField, Button, FormControlLabel, Switch } from '@mui/material';
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

interface empMain {
    idTypeStock: number;
    typeStockName: string;
    active: boolean;
}

interface empApiMain { //estructura del objeto que se trae del api
    success: boolean;
    data: empMain;
}

const FormEmpD: React.FC<FormProps> = ({ onClose }) => {
    const initialState: empMain = {
        idTypeStock: 0,
        typeStockName: '',
        active: true,
    };

    const [formData, setFormData] = useState<empMain>(initialState);
    const [searchId, setSearchId] = useState<number | ''>(''); // Para buscar por id
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');
    const [openAlert, setOpenAlert] = useState(false);
    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    const handleSearch = async () => {
        if (searchId === '') {
            setAlertMessage('Por favor, ingresa un ID.');
            setOpenAlert(true);
            return;
        }
        try {
            const response: empApiMain = await apiServices.getData(`Empaques/ReadEmpById/${searchId}`);

            if (response.success && response.data) {
                setFormData(response.data);
                setAlertMessage("Empaque encontrado");
                setOpenAlert(true);
            } else {
                setAlertMessage("ID no encontrado.");
                setFormData(initialState);
                setOpenAlert(true);
            }
        } catch (error) {
            console.error("Error en la búsqueda:", error);
            setAlertMessage("Ocurrió un error al buscar el empaque.");
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
                data: empMain;
            }>(`Empaques/DelEmpById/${searchId}`);
    
            if (response.success) {
                setAlertMessage(`Empaque eliminado correctamente.`);
                setAlertSeverity('success');
                setOpenAlert(true);
                setFormData(initialState); // Limpia los datos en pantalla
                setTimeout(() => {
                    onClose(); // Cerrar formulario después de 7 segundos
                }, 1300);
            } else {
                setAlertMessage('No se pudo eliminar el empaque.');
                setAlertSeverity('error');
                setOpenAlert(true);
            }
        } catch (error) {
            console.error("Error al eliminar el empaque:", error);
            setAlertMessage('Ocurrió un error al intentar eliminar el empaque.');
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
                Formulario eliminar empaques
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
                />
                <Button type="button" onClick={handleSearch} variant="contained" startIcon={<SearchIcon />}>Buscar</Button>
            </div>
            <br />
            {formData && (
                <div>
                    <h3>Datos del empaque:</h3>
                    <br />
                    <p>
                        <strong>Nombre del empaque:</strong> {formData.typeStockName}
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

export default FormEmpD;
