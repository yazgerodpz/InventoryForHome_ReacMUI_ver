"use client";
import { Button, FormControlLabel, Switch, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import apiServices from '../Services/apiServices';

// Definir las interfaces
interface formE {
    idTypeStock: number;
    typeStockName: string;
    active: boolean;
}

interface empApiMain {
    success: boolean;
    data: formE[];
}

const FormEmpC: React.FC = () => {

    const [formData, setFormData] = useState<formE>({
        idTypeStock: 0,
        typeStockName: "",
        active: true,
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
            active: e.target.checked,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí puedes hacer la lógica para manejar el envío del formulario
        console.log('Formulario enviado:', formData);

        try {
            const response = await apiServices.postData<{
                success: boolean;
                data: formE;
            }>("Empaques/CrearEmp/nombreEmpaque", formData);
            console.log('nuevo empaque creado:', response);
            if (response.success) {
                alert("nuevo empaque creado exitosamente");
                // se reinicia el formulario
                setFormData({ idTypeStock: 0, typeStockName: "", active: true });
            } else {
                alert("Error al crear el empaque");
            }
        } catch (error) {
            console.error("Error al enviar datos:", error);
            alert('Error al crear el nuevo empaque. Revisa la consola para más detalles.');
        }
    };

    const handleCancel = () => {
        setFormData({
            idTypeStock: 0,
            typeStockName: "",
            active: true,
        }); // Resetear los campos del formulario
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h5" gutterBottom>
                Formulario Crear Empaque
            </Typography>
            <div>
                <TextField
                    id="typeStockName"
                    label="Nombre del empaque"
                    name="typeStockName"
                    value={formData.typeStockName}
                    onChange={handleChange}
                    variant="outlined"
                    required
                />
            </div>
            <div>
                <FormControlLabel control=
                    {
                        <Switch
                            id="active"
                            name="active"
                            checked={formData.active}
                            onChange={handleChange} />
                    }
                    labelPlacement="start"
                    label="Activo" />
            </div>
            <Button color="success" type="submit" variant="contained" startIcon={<SaveIcon />} className="button-spacing">
                Guardar
            </Button>
            <Button color="error" type="button" onClick={handleCancel} variant="contained" startIcon={<CancelIcon />}>
                Cancelar
            </Button>
        </form>
    );
};

export default FormEmpC;
