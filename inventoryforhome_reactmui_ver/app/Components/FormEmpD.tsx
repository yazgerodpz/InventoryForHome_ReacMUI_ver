"use client";
import React, { useState } from 'react';

interface TypeStock {
    idTypeStock: number;
    typeStockName: string;
}

const FormEmpD: React.FC = () => {
    const [formData, setFormData] = useState<TypeStock | null>(null); // Datos encontrados
    const [searchId, setSearchId] = useState<number | ''>(''); // ID para la búsqueda

    // Simulación de datos para la búsqueda
    const fakeData: Record<number, TypeStock> = {
        1: {
            idTypeStock: 1,
            typeStockName: 'Box',
        },
        2: {
            idTypeStock: 2,
            typeStockName: 'Bag',
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
                    <h3>TypeStock Details:</h3>
                    <p>
                        <strong>Type Stock Name:</strong> {formData.typeStockName}
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

export default FormEmpD;
