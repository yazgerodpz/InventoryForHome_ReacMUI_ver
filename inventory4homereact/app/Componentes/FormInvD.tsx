"use client";
import React, { useState } from 'react';
import { Typography, TextField, Button, Box, FormControlLabel, Switch } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';

interface Item {
    itemName: string;
    stock: number;
    typePrioritaryName: string;
    typeStockName: string;
    purchesDate: Date;
    expirationDate: Date;
    active: boolean;
}

const FormInvD: React.FC = () => {
    const [formData, setFormData] = useState<Item | null>(null); // Datos encontrados
    const [searchId, setSearchId] = useState<number | ''>(''); // ID para la búsqueda

    // Simulación de datos para la búsqueda
    const fakeData: Record<number, Item> = {
        1: {
            itemName: 'Item 1',
            stock: 10,
            typePrioritaryName: 'High',
            typeStockName: 'Box',
            purchesDate: new Date('2024-01-01'),
            expirationDate: new Date('2024-12-31'),
            active: true,
        },
        2: {
            itemName: 'Item 2',
            stock: 5,
            typePrioritaryName: 'Medium',
            typeStockName: 'Bag',
            purchesDate: new Date('2024-02-01'),
            expirationDate: new Date('2024-11-30'),
            active: false,
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
            alert(`Item with ID ${searchId} deleted successfully.`); // Muestra alerta de confirmación
        } else {
            alert('No item found to delete.');
        }
    };

    const handleCancel = () => {
        setFormData(null); // Limpia los datos
        setSearchId(''); // Limpia el ID de búsqueda
    };

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Formulario eliminar artículo
            </Typography>
            <div>
                {/* <label>Search by ID:</label>
                <input
                    type="number"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value ? Number(e.target.value) : '')}
                /> */}
                {/* <button type="button" onClick={handleSearch}>
                    Search
                </button> */}
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
                    <h3>Item Details:</h3>
                    <p>
                        <strong>Name:</strong> {formData.itemName}
                    </p>
                    <p>
                        <strong>Stock:</strong> {formData.stock}
                    </p>
                    <p>
                        <strong>Type Prioritary:</strong> {formData.typePrioritaryName}
                    </p>
                    <p>
                        <strong>Type Stock:</strong> {formData.typeStockName}
                    </p>
                    <p>
                        <strong>Purchase Date:</strong> {formData.purchesDate.toDateString()}
                    </p>
                    <p>
                        <strong>Expiration Date:</strong> {formData.expirationDate.toDateString()}
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

export default FormInvD;
