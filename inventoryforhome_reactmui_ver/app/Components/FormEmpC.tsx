"use client";
import React, { useState } from 'react';

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
            <div>
                <label htmlFor="typeStockName">Nombre del nuevo empaque:</label>
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

export default FormEmpC;
