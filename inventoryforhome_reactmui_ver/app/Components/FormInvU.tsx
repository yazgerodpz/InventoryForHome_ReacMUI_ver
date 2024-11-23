"use client";
import React, { useState } from 'react';
import { Typography, TextField, Button, FormControlLabel, Switch, MenuItem, Select, InputLabel, FormControl, } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
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

const priorityOptions = ['Alta', 'Media', 'Baja'];
const stockTypeOptions = ['Caja', 'Bolsa', 'Palet'];

const FormInvU: React.FC = () => {
    const [formData, setFormData] = useState<Item>({
        itemName: '',
        stock: 0,
        typePrioritaryName: '',
        typeStockName: '',
        purchesDate: new Date(),
        expirationDate: new Date(),
        active: true,
    });

    const [searchId, setSearchId] = useState<number | ''>(''); // Estado para el ID de búsqueda

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
            setFormData(fakeData[searchId]); // Rellena el formulario con los datos encontrados
        } else {
            alert('ID not found');
        }
    };

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
        <div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <Typography variant="h5" gutterBottom>
                Formulario actualizar artículos
            </Typography>
            <div>
                <TextField
                    id="searchId"
                    label="Buscar por ID"
                    type="number"
                    value={searchId ?? ''}
                    onChange={(e) => setSearchId(e.target.value ? Number(e.target.value) : '')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <Button type="button" onClick={handleSearch} variant="contained" startIcon={<SearchIcon />}>Buscar</Button>
            </div>

                <div>
                    <TextField
                        label="Item Name"
                        name="itemName"
                        value={formData.itemName}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        required
                    />
                </div>
                <div>
                    <TextField
                        label="Stock"
                        name="stock"
                        type="number"
                        value={formData.stock}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        required
                    />
                </div>
                <div>
                    <FormControl fullWidth>
                        <InputLabel>Regla de Prioridad</InputLabel>
                        <Select
                            name="typePrioritaryName"
                            value={formData.typePrioritaryName}
                            onChange={handleChange}
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
                </div>
                <div>
                    <FormControl fullWidth>
                        <InputLabel>Tipo de Empaque</InputLabel>
                        <Select
                            name="typeStockName"
                            value={formData.typeStockName}
                            onChange={handleChange}
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
                </div>
                <div>
                    <TextField
                        label="Purchase Date"
                        name="purchesDate"
                        type="date"
                        value={formData.purchesDate.toISOString().split('T')[0]}
                        onChange={handleDateChange}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                </div>
                <div>
                    <TextField
                        label="Expiration Date"
                        name="expirationDate"
                        type="date"
                        value={formData.expirationDate
                            .toISOString()
                            .split('T')[0]}
                        onChange={handleDateChange}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                </div>
                <div>
                    <FormControlLabel
                        control={
                            <Switch
                                id="active"
                                name="active"
                                checked={formData.active}
                                onChange={handleChange}
                            />
                        }
                        label="Activo"
                    />
                </div>
                <div>
                    <Button
                        color="success"
                        type="submit"
                        variant="contained"
                        startIcon={<SaveIcon />}
                    >
                        Guardar
                    </Button>
                    <Button
                        color="error"
                        type="button"
                        onClick={handleCancel}
                        variant="contained"
                        startIcon={<CancelIcon />}
                    >
                        Cancelar
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FormInvU;
