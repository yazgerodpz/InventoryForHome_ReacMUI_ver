"use client";
import React, { useState } from 'react';

interface Item {
    itemName: string;
    stock: number;
    typePrioritaryName: string;
    typeStockName: string;
    purchesDate: Date;
    expirationDate: Date;
    active: boolean;
}

const FormInvC: React.FC = () => {
    const [formData, setFormData] = useState<Item>({
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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre del nuevo artículo:</label>
                <input
                    type="text"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Cantidad:</label>
                <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Regla de prioridad:</label>
                <input
                    type="text"
                    name="typePrioritaryName"
                    value={formData.typePrioritaryName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Tipo de empaque:</label>
                <input
                    type="text"
                    name="typeStockName"
                    value={formData.typeStockName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Fecha de compra:</label>
                <input
                    type="date"
                    name="purchesDate"
                    value={formData.purchesDate.toISOString().split('T')[0]}
                    onChange={handleDateChange}
                />
            </div>
            <div>
                <label>Fecha de expiración:</label>
                <input
                    type="date"
                    name="expirationDate"
                    value={formData.expirationDate.toISOString().split('T')[0]}
                    onChange={handleDateChange}
                />
            </div>
            <div>
                <label>
                    Active:
                    <input
                        type="checkbox"
                        name="active"
                        checked={formData.active}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <button type="submit">Guardar</button>
                <button type="button" onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default FormInvC;
