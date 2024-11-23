"use client";
import React, { useState } from 'react';
import { Typography, TextField, Button, FormControlLabel, Switch } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';

interface TypeStock {
    idTypeStock: number;
    typeStockName: string;
    active: boolean;
}

const FormEmpD: React.FC = () => {
    const [formData, setFormData] = useState<TypeStock | null>(null); // Datos encontrados
    const [searchId, setSearchId] = useState<number | ''>(''); // ID para la búsqueda

    // Simulación de datos para la búsqueda
    const fakeData: Record<number, TypeStock> = {
        1: {
            idTypeStock: 1,
            typeStockName: 'Box',
            active: true
        },
        2: {
            idTypeStock: 2,
            typeStockName: 'Bag',
            active: true
        },
    };

    const handleSearch = () => {
        if (typeof searchId === 'number' && fakeData[searchId]) {
            setFormData(fakeData[searchId]); // Muestra los datos encontrados
        } else {
            alert('ID not found');
            setFormData(null); // Limpia si no se encuentra
        }
    };

    const handleDelete = () => {
        if (typeof searchId === 'number' && fakeData[searchId]) {
            delete fakeData[searchId]; // Simula la eliminación
            setFormData(null); // Limpia los datos en pantalla
            alert(`TypeStock with ID ${searchId} deleted successfully.`); // Muestra alerta de confirmación
        } else {
            alert('No TypeStock found to delete.');
        }
    };

    const handleCancel = () => {
        setFormData(null); // Limpia los datos
        setSearchId(''); // Limpia el ID de búsqueda
    };

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Formulario eliminar empaques
            </Typography>
            <div>
                {/* <label>Search by ID:</label>
                    <input
                        type="number"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value ? Number(e.target.value) : '')} /> */}
                <TextField
                    id="searchId"
                    label="Buscar por ID"
                    type="number"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value ? Number(e.target.value) : '')}
                    InputLabelProps={{
                        shrink: true, // Mantiene la etiqueta flotando
                    }}
                />
                <Button type="button" onClick={handleSearch} variant="contained" startIcon={<SearchIcon />}>Buscar</Button>
            </div>

            {formData && (
                <div>
                    <h3>Datos del empaque:</h3>
                    <p>
                        <strong>Nombre del empaque:</strong> {formData.typeStockName}
                    </p>
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
                </div>
            )}
        </div>
    );
};

export default FormEmpD;
