"use client";
import { Button, FormControlLabel, Switch, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import apiServices from '../Services/apiServices';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

// Definir las interfaces
interface FormProps {
    onClose: () => void;
}

interface formE {
    idTypeStock: number;
    typeStockName: string;
    active: boolean;
}

const FormEmpC:  React.FC<FormProps> = ({ onClose }) => {

    const [formData, setFormData] = useState<formE>({
        idTypeStock: 0,
        typeStockName: "",
        active: true,
    });

    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');
    const [openAlert, setOpenAlert] = useState(false);
    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

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
                //Alerta
                setAlertMessage("Nuevo empaque creado exitosamente");
                setAlertSeverity("success");
                setOpenAlert(true);
                // se reinicia el formulario
                setFormData({ idTypeStock: 0, typeStockName: "", active: true });
                setTimeout(() => {
                    onClose(); // Cerrar formulario después de 7 segundos
                }, 1300);
            } else {
                setAlertMessage("Error al crear el empaque");
                setAlertSeverity("error");
                setOpenAlert(true);
            }
        } catch (error) {
            console.error("Error al enviar datos:", error);
            setAlertMessage("Error al crear el nuevo empaque. Revisa la consola para más detalles.");
            setAlertSeverity("error");
            setOpenAlert(true);
        }
    };

    const handleCancel = () => {
        setFormData({
            idTypeStock: 0,
            typeStockName: "",
            active: true,
        }); // Resetear los campos del formulario
        onClose(); // Cerrar el diálogo
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
            <Snackbar open={openAlert} autoHideDuration={11000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={alertSeverity} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </form>
    );
};

export default FormEmpC;
