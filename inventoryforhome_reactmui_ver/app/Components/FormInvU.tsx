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
            <div>
                <label>Search by ID:</label>
                <input
                    type="number"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value ? Number(e.target.value) : '')}
                />
                <button type="button" onClick={handleSearch}>
                    Search
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Item Name:</label>
                    <input
                        type="text"
                        name="itemName"
                        value={formData.itemName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Stock:</label>
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Type Prioritary Name:</label>
                    <input
                        type="text"
                        name="typePrioritaryName"
                        value={formData.typePrioritaryName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Type Stock Name:</label>
                    <input
                        type="text"
                        name="typeStockName"
                        value={formData.typeStockName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Purchase Date:</label>
                    <input
                        type="date"
                        name="purchesDate"
                        value={formData.purchesDate.toISOString().split('T')[0]}
                        onChange={handleDateChange}
                    />
                </div>
                <div>
                    <label>Expiration Date:</label>
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
                    <button type="submit">Submit</button>
                    <button type="button" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormInvU;
