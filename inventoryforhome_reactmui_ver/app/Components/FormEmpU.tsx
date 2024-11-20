"use client";
import React, { useState } from 'react';

interface TypeStock {
    idTypeStock: number;
    typeStockName: string;
    active: boolean;
}

const FormEmpU = () => {
    const initialState: TypeStock = {
        idTypeStock: 0,
        typeStockName: '',
        active: false,
    };

    const [formData, setFormData] = useState<TypeStock>(initialState);
    const [searchId, setSearchId] = useState<number | ''>(''); // Para buscar por id
    const [message, setMessage] = useState<string>(''); // Mensajes de estado

    // Datos simulados para la búsqueda (esto sería reemplazado por una API)
    const sampleData: TypeStock[] = [
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
            <div>
                <label htmlFor="searchId">Buscar por ID:</label>
                <input
                    type="number"
                    id="searchId"
                    value={searchId}
                    onChange={(e) => setSearchId(Number(e.target.value))}
                    placeholder="Ingresa ID"
                />
                <button type="button" onClick={handleSearch}>Buscar</button>
            </div>

            {message && <p>{message}</p>}

            <div>
                <label htmlFor="typeStockName">Nombre del Tipo de Stock:</label>
                <input
                    type="text"
                    id="typeStockName"
                    name="typeStockName"
                    value={formData.typeStockName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="active">Activo:</label>
                <input
                    type="checkbox"
                    id="active"
                    name="active"
                    checked={formData.active}
                    onChange={handleChange}
                />
            </div>

            <button type="submit">Guardar</button>
            <button type="button" onClick={handleCancel}>Cancelar</button>
        </form>
    );
};

export default FormEmpU;
