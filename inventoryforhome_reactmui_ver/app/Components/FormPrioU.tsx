"use client";
import React, { useState } from 'react';

interface TypePrioritary {
  TypePrioritaryName: string;
  Description: string;
  Active: boolean;
}

const FormPrioU: React.FC = () => {
  const [formData, setFormData] = useState<TypePrioritary>({
    TypePrioritaryName: '',
    Description: '',
    Active: true, // Valor predeterminado para el campo Active
  });

  const [searchId, setSearchId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      Active: e.target.checked,
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchId(Number(e.target.value));
  };

  const handleSearch = async () => {
    if (searchId !== null) {
      // Aquí puedes hacer la llamada a la API o a la base de datos para obtener el registro por Id
      // Por ejemplo, simulemos con un objeto:
      const dataFromApi = {
        TypePrioritaryName: 'Alta',
        Description: 'Prioridad alta',
        Active: true,
      };
      setFormData(dataFromApi);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Aquí puedes agregar la lógica para enviar los datos al servidor o hacer alguna otra acción
  };

  const handleCancel = () => {
    setFormData({
      TypePrioritaryName: '',
      Description: '',
      Active: true,
    });
    setSearchId(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="searchId">Buscar por ID:</label>
        <input
          type="number"
          id="searchId"
          value={searchId ?? ''}
          onChange={handleSearchChange}
        />
        <button type="button" onClick={handleSearch}>Buscar</button>
      </div>

      <div>
        <label htmlFor="TypePrioritaryName">Nombre de la regla de prioridad:</label>
        <input
          type="text"
          id="TypePrioritaryName"
          name="TypePrioritaryName"
          value={formData.TypePrioritaryName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="Description">Descripción:</label>
        <input
          type="text"
          id="Description"
          name="Description"
          value={formData.Description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="Active">Activo:</label>
        <input
          type="checkbox"
          id="Active"
          name="Active"
          checked={formData.Active}
          onChange={handleCheckboxChange}
        />
      </div>
      <div>
        <button type="submit">Guardar</button>
        <button type="button" onClick={handleCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default FormPrioU;
