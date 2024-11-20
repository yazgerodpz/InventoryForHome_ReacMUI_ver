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
                        <strong>Active:</strong>{' '}
                        <input
                            type="checkbox"
                            checked={formData.active}
                            readOnly
                        />
                    </p>

                    <button type="button" onClick={handleDelete}>
                        Delete
                    </button>
                    <button type="button" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default FormInvD;
