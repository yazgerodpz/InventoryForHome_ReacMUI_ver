"use client";
import { Button, FormControlLabel, Switch, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import apiServices from '../Services/apiServices';

// Definir las interfaces
interface empMain {
    idTypeStock: number;
    typeStockName: string;
    active: boolean;
  }
  
  interface empApiMain {
    success: boolean;
    data: empMain[];
  }

const FormEmpC: React.FC = () => {
    
    const initialState: empMain = {
        idTypeStock: 0,
        typeStockName: '',
        active: true,
    };

    const [formData, setFormData] = useState<empMain | null>(null);
    const [loading, setLoading] = useState<boolean>(false); // Estado de carga

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); // Bloquea el formulario mientras se envía
        // Aquí puedes hacer la lógica para manejar el envío del formulario
        console.log('Formulario enviado:', formData);
        try {
            const response = await apiServices.postData("Empaques/CrearEmp/nombreEmpaque", formData, {
                headers: { "Content-Type": "application/json" },
            });

            console.log("Éxito:", response.data);
            alert("Empaque creado correctamente"); // Puedes cambiarlo por un Snackbar
            setFormData(initialState); // Resetear formulario tras éxito
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            alert("Error al enviar el formulario");
        } finally {
            setLoading(false); // Reactivar el botón
        }
    };

    const handleCancel = () => {
        setFormData(initialState); // Resetear los campos del formulario
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h5" gutterBottom>
                Formulario Crear Empaque
            </Typography>
            <div>
                <TextField 
                    id="typeStockName" 
                    label="Nombre del empaque" 
                    name="typeStockName"
                    value={formData.typeStockName}
                    onChange={handleChange}
                    variant="outlined" 
                    required
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
            <Button color="success" type="submit" variant="contained" startIcon={<SaveIcon />}
                className="button-spacing"
                disabled={loading} // Deshabilita mientras se envía
            >
                {loading ? "Guardando..." : "Guardar"}
            </Button>            
            <Button color="error" type="button" onClick={handleCancel} variant="contained" startIcon={<CancelIcon />}>
                Cancelar
            </Button>
        </form>
    );
};

export default FormEmpC;
