"use client";
import React, { useState } from 'react';

interface TypePrioritary {
    IdTypePrioritary: number;
    TypePrioritaryName: string;
    Description: string;
}

const FormPrioD: React.FC = () => {
    const [formData, setFormData] = useState<TypePrioritary | null>(null); // Datos encontrados
    const [searchId, setSearchId] = useState<number | ''>(''); // ID para la búsqueda

    // Simulación de datos para la búsqueda
    const fakeData: Record<number, TypePrioritary> = {
        1: {
            IdTypePrioritary: 1,
            TypePrioritaryName: 'High Priority',
            Description: 'This item has high priority.',
        },
        2: {
            IdTypePrioritary: 2,
            TypePrioritaryName: 'Medium Priority',
            Description: 'This item has medium priority.',
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
            alert(`TypePrioritary with ID ${searchId} deleted successfully.`); // Muestra alerta de confirmación
        } else {
            alert('No TypePrioritary found to delete.');
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
                    <h3>TypePrioritary Details:</h3>
                    <p>
                        <strong>Type Prioritary Name:</strong> {formData.TypePrioritaryName}
                    </p>
                    <p>
                        <strong>Description:</strong> {formData.Description}
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

export default FormPrioD;
