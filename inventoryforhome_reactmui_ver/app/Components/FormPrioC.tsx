"use client";
import React, { useState } from 'react';

interface TypePrioritary {
  TypePrioritaryName: string;
  Description: string;
  Active: boolean;
}

const FormPrioC: React.FC = () => {
  const [formData, setFormData] = useState<TypePrioritary>({
    TypePrioritaryName: '',
    Description: '',
    Active: true, // Valor predeterminado para el campo Active
  });

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
    // Aquí puedes agregar la lógica para cerrar el formulario o hacer alguna otra acción
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="TypePrioritaryName">Nombre de la nueva regla de prioridad:</label>
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

export default FormPrioC;
