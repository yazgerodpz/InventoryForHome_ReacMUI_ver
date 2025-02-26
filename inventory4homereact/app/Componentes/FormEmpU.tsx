"use client";
import { Typography, TextField, Button, FormControlLabel, Switch } from '@mui/material';
import React, { useState, useEffect } from 'react';
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

interface empMain {
    idTypeStock: number;
    typeStockName: string;
    active: boolean;
}

interface empApiMain { //estructura del objeto que se trae del api
    success: boolean;
    data: empMain;
  }

const FormEmpU:  React.FC<FormProps> = ({ onClose }) => {
    const initialState: empMain = {
        idTypeStock: 0,
        typeStockName: '',
        active: true,
    };

    const [formData, setFormData] = useState<empMain>(initialState);
    const [searchId, setSearchId] = useState<number | ''>(''); // Para buscar por id
    const [message, setMessage] = useState<string>(''); // Mensajes de estado
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
        const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');
        const [openAlert, setOpenAlert] = useState(false);
        const handleCloseAlert = () => {
            setOpenAlert(false);
        };

    // Datos simulados para la búsqueda (esto sería reemplazado por una API)
    // const sampleData: empMain[] = [
    //     { idTypeStock: 1, typeStockName: 'Almacén A', active: true },
    //     { idTypeStock: 2, typeStockName: 'Almacén B', active: false },
    //     { idTypeStock: 3, typeStockName: 'Almacén C', active: true },
    // ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSearch = async () => {
        if (searchId === '') {
            setAlertMessage('Por favor, ingresa un ID.');
            return;
        }
        try {
            const response: empApiMain = await apiServices.getData(`Empaques/ReadEmpById/${searchId}`);

            if (response.success && response.data) {
                setFormData(response.data);
                setAlertMessage("hola");
            } else {
                setAlertMessage("ID no encontrado.");
                setFormData(initialState);
            }
        } catch (error) {
            console.error("Error en la búsqueda:", error);
            setAlertMessage("Ocurrió un error al buscar el empaque.");
            setFormData(initialState);
        }
    };
        

        // Simulando la búsqueda del objeto por ID
    //     const found = sampleData.find((item) => item.idTypeStock === searchId);

    //     if (found) {
    //         setFormData(found);
    //         setMessage('');
    //     } else {
    //         setMessage('ID no encontrado.');
    //     }
    // };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí puedes hacer la lógica para manejar el envío del formulario
        console.log('Formulario enviado:', formData);
    try {
                const response = await apiServices.postData<{
                    success: boolean;
                    data: empMain;
                }>("Empaques/EditEmp/nuevoItem", formData);
                console.log('nuevo empaque creado:', response);
                if (response.success) {
                    //Alerta
                    setAlertMessage("Empaque actualizado exitosamente");
                    setAlertSeverity("success");
                    setOpenAlert(true);
                    // se reinicia el formulario
                    setFormData({ idTypeStock: 0, typeStockName: "", active: true });
                    setTimeout(() => {
                        onClose(); // Cerrar formulario después de 7 segundos
                    }, 1300);
                } else {
                    setAlertMessage("Error al actualizar el empaque");
                    setAlertSeverity("error");
                    setOpenAlert(true);
                }
            } catch (error) {
                console.error("Error al enviar datos:", error);
                setAlertMessage("Error al actualizar empaque. Revisa la consola para más detalles.");
                setAlertSeverity("error");
                setOpenAlert(true);
            }
        };

    const handleCancel = () => {
        setFormData(initialState); // Resetear los campos del formulario
        setMessage('');
        onClose(); // Cerrar el diálogo
    };

    return (
        <form onSubmit={handleSubmit}>
             <Typography variant="h5" gutterBottom>
                Formulario actualizar empaques
            </Typography>
            <div>
                {/* <label htmlFor="searchId">Buscar por ID:</label>
                <input
                    type="number"
                    id="searchId"
                    value={searchId}
                    onChange={(e) => setSearchId(Number(e.target.value))}
                    placeholder="Ingresa ID"
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
                <Button type="button" onClick={handleSearch} variant="contained" startIcon={<SearchIcon/>}>Buscar</Button>
            </div>

            {message && <p>{message}</p>}

            <div>
                <TextField 
                    id="typeStockName" 
                    label="Nombre del empaque" 
                    name="typeStockName"
                    value={formData.typeStockName}
                    onChange={handleChange}
                    variant="outlined" 
                    required
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
                            onChange={handleChange} />
                    } 
                    labelPlacement="start"
                    label="Activo" />
            </div>
            <Button color="success" type="submit" variant="contained" startIcon={<SaveIcon />}className="button-spacing">
                Guardar
            </Button>            
            <Button color="error" type="button" onClick={handleCancel} variant="contained" startIcon={<CancelIcon />}>
                Cancelar
            </Button>
        </form>
    );
};

export default FormEmpU;
