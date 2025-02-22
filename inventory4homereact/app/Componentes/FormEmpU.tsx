"use client";
import { Typography, TextField, Button, FormControlLabel, Switch } from '@mui/material';
import React, { useState, useEffect } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import apiServices from '../Services/apiServices';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

interface empMain {
    idTypeStock: number;
    typeStockName: string;
    active: boolean;
}

interface empApiMain { //estructura del objeto que se trae del api
    success: boolean;
    data: empMain[];
  }

const FormEmpU = () => {
    const initialState: empMain = {
        idTypeStock: 0,
        typeStockName: '',
        active: false,
    };

    const [formData, setFormData] = useState<empMain>(initialState);
    const [searchId, setSearchId] = useState<number | ''>(''); // Para buscar por id
    const [message, setMessage] = useState<string>(''); // Mensajes de estado

    // Datos simulados para la búsqueda (esto sería reemplazado por una API)
    const sampleData: empMain[] = [
        { idTypeStock: 1, typeStockName: 'Almacén A', active: true },
        { idTypeStock: 2, typeStockName: 'Almacén B', active: false },
        { idTypeStock: 3, typeStockName: 'Almacén C', active: true },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSearch = () => {
        if (searchId === '') {
            setMessage('Por favor, ingresa un ID.');
            return;
        }

        // Simulando la búsqueda del objeto por ID
        const found = sampleData.find((item) => item.idTypeStock === searchId);

        if (found) {
            setFormData(found);
            setMessage('');
        } else {
            setMessage('ID no encontrado.');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí puedes hacer la lógica para manejar el envío del formulario
        console.log('Formulario enviado:', formData);
    };

    const handleCancel = () => {
        setFormData(initialState); // Resetear los campos del formulario
        setMessage('');
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
                    value={searchId ?? ''}
                    onChange={(e) => setSearchId(Number(e.target.value))}
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
