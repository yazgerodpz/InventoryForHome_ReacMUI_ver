"use client";
import { Button, FormControlLabel, Switch, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

interface TypeStock {
    typeStockName: string; // Nombre del tipo de stock
    active: boolean; // Estado de actividad
}

const FormEmpC = () => {
    
    const initialState: TypeStock = {
        typeStockName: '',
        active: true,
    };

    const [formData, setFormData] = useState<TypeStock>(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí puedes hacer la lógica para manejar el envío del formulario
        console.log('Formulario enviado:', formData);
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
            <Button color="success" type="submit" variant="contained" startIcon={<SaveIcon />}className="button-spacing">
                Guardar
            </Button>            
            <Button color="error" type="button" onClick={handleCancel} variant="contained" startIcon={<CancelIcon />}>
                Cancelar
            </Button>
        </form>
    );
};

export default FormEmpC;
