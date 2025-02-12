"use client";
import React, { useState } from 'react';
import { Typography, TextField, Button, Switch, Select, MenuItem, FormControl, InputLabel, FormControlLabel } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import apiServices from '../Services/apiServices';

interface formI {
    itemName: string;
    stock: number;
    typePrioritaryName: string;
    typeStockName: string;
    purchesDate: Date;
    expirationDate: Date;
    active: boolean;
}

// Opciones para los selectores
const priorityOptions = ['Alta', 'Media', 'Baja'];
const stockTypeOptions = ['Caja', 'Bolsa', 'Palet'];

const FormInvC: React.FC = () => {
    const [formData, setFormData] = useState<formI>({
        itemName: '',
        stock: 0,
        typePrioritaryName: '',
        typeStockName: '',
        purchesDate: new Date(),
        expirationDate: new Date(),
        active: true,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : name === 'stock' ? Number(value) : value,
        }));
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: new Date(value),
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
    };

    const handleCancel = () => {
        setFormData({
            itemName: '',
            stock: 0,
            typePrioritaryName: '',
            typeStockName: '',
            purchesDate: new Date(),
            expirationDate: new Date(),
            active: true,
        });
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <Typography variant="h5" gutterBottom>
                Formulario Crear nuevo artículo
            </Typography>
            <TextField
                id="itemName"
                label="Nombre del nuevo artículo"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                variant="outlined"
                required
            />
            <TextField
                id="stock"
                label="Cantidad"
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                variant="outlined"
                required
            />
            <FormControl variant="outlined" required>
                <InputLabel id="typePrioritaryName-label">Regla de prioridad</InputLabel>
                <Select
                    labelId="typePrioritaryName-label"
                    id="typePrioritaryName"
                    name="typePrioritaryName"
                    value={formData.typePrioritaryName}
                    onChange={handleChange}
                    label="Regla de prioridad"
                >
                    <MenuItem value="">
                        <em>Seleccione una opción</em>
                    </MenuItem>
                    {priorityOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl variant="outlined" required>
                <InputLabel id="typeStockName-label">Tipo de empaque</InputLabel>
                <Select
                    labelId="typeStockName-label"
                    id="typeStockName"
                    name="typeStockName"
                    value={formData.typeStockName}
                    onChange={handleChange}
                    label="Tipo de empaque"
                >
                    <MenuItem value="">
                        <em>Seleccione una opción</em>
                    </MenuItem>
                    {stockTypeOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                id="purchesDate"
                label="Fecha de compra"
                type="date"
                name="purchesDate"
                value={formData.purchesDate.toISOString().split('T')[0]}
                onChange={handleDateChange}
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
                required
            />
            <TextField
                id="expirationDate"
                label="Fecha de expiración"
                type="date"
                name="expirationDate"
                value={formData.expirationDate.toISOString().split('T')[0]}
                onChange={handleDateChange}
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
                required
            />
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
            <div>
                <Button color="success" type="submit" variant="contained" startIcon={<SaveIcon />} className="button-spacing">
                    Guardar
                </Button>
                <Button color="error" type="button" onClick={handleCancel} variant="contained" startIcon={<CancelIcon />}>
                    Cancelar
                </Button>
            </div>
        </form>
    );
};

export default FormInvC;
