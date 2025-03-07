"use client";
import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Switch, Select, MenuItem, FormControl, InputLabel, FormControlLabel } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import apiServices from '../Services/apiServices';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

// Definir las interfaces
interface FormProps {
    onClose: () => void;
}

interface empMain {
    idTypeStock: number;
    typeStockName: string;
    active: boolean;
}

interface empApiMain {
    success: boolean;
    data: empMain[];
}

interface prioMain {
    idTypePrioritary: number;
    typePrioritaryName: string;
    _Description: string;
    active: boolean;
}

interface prioApiMain { //estructura del objeto que se trae del api
    success: boolean;
    data: prioMain[];
}

interface formI {
    idItem: number;
    itemName: string;
    stock: number;
    idTypePrioritary: number;
    idTypeStock: number;
    purchesDate: Date;
    expirationDate: Date;
    active: boolean;
}

const FormInvC: React.FC<FormProps> = ({ onClose }) => {

    // Estado para la respuesta de la API
    const [responseAPI1, setResponseAPI1] = useState<empApiMain | null>(null);
    // Estado para almacenar la lista de empaques
    const [mainEmp, setMainEmp] = useState<empMain[]>([]);
    const [responseAPI2, setResponseAPI2] = useState<prioApiMain | null>(null); // Estado para la respuesta de la API
    const [mainPrio, setMainPrio] = useState<prioMain[]>([]); // Estado para la lista de prioridades

    // Función para traer los datos de la API
    const getEmpaques = async () => {
        try {
            // Llamada a la API usando Axios
            // setResponseAPI (await apiServices.getData("Empaques/ReadEmps"));
            const prueba = await apiServices.getData("Empaques/ReadEmps") as empApiMain;
            setResponseAPI1(prueba);
            setMainEmp(prueba.data);
            console.log(prueba);
            console.log(responseAPI1);
            console.log(mainEmp);

            //setMainEmp(responseAPI?.data); // Actualizar los datos de la tabla
        } catch (error) {
            console.error('ERROR AL TRAER DATOS:', error);
        }
    };

    // Función para obtener datos de prioridades
    const getPrioridades = async () => {
        try {
            const responsePrio = await apiServices.getData('Prioridades/ReadPrios') as prioApiMain;
            setResponseAPI2(responsePrio); // Almacena la respuesta completa
            setMainPrio(responsePrio.data); // Extrae y almacena los datos de prioridades
            console.log(responseAPI2);
            console.log(mainPrio);
        } catch (error) {
            console.error('ERROR AL TRAER DATOS EN', error);
        }
    };

    //Llamar a las funciones dentro de useEffect
    useEffect(() => {
        getEmpaques();
        getPrioridades();
    }, []);

    //estructura para el formulario Inv
    const [formData, setFormData] = useState<formI>({
        idItem: 0,
        itemName: "",
        stock: 0,
        idTypePrioritary: 0,
        idTypeStock: 0,
        purchesDate: new Date(),
        expirationDate: new Date(),
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

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: new Date(value),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
        //codigo para la conexion con la api
        try {
            const response = await apiServices.postData<{
                success: boolean;
                data: formI;
            }>("Inventario/CrearInv/nuevoItem", formData);
            console.log(formData)
            console.log('Articulo creado', response);
            if (response.success) {
                //Alerta
                setAlertMessage("Nuevo artículo creado exitosamente");
                setAlertSeverity("success");
                setOpenAlert(true);
                // se reinicia el formulario
                // setFormData({
                //     idItem: 0, itemName: "", stock: 0, idTypePrioritary,typePrioritaryName: "", typeStockName: "",
                //     purchesDate: new Date, expirationDate: new Date, active: true
                // });
                setTimeout(() => {
                    onClose(); // Cerrar formulario después de 7 segundos
                }, 1300);
            } else {
                setAlertMessage("Error al crear el nuevo artículo");
                setAlertSeverity("error");
                setOpenAlert(true);
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            setAlertMessage("Error al crear el nuevo empaque. Revisa la consola para más detalles.");
            setAlertSeverity("error");
            setOpenAlert(true);

        }
    };

    const handleCancel = () => {
        setFormData({
            idItem: 0,
            itemName: "",
            stock: 0,
            idTypePrioritary:0,
            idTypeStock:0,
            purchesDate: new Date(),
            expirationDate: new Date(),
            active: true,
        });
        // Aquí puedes agregar la lógica para cerrar el formulario o hacer alguna otra acción
        onClose(); // Cerrar el diálogo
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <Typography variant="h5" gutterBottom>
                Formulario Crear nuevo artículo
            </Typography>
            <TextField
                id="itemName"
                label="Nombre del nuevo artículo"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                variant="outlined"
                required
            />
            <TextField
                id="stock"
                label="Cantidad"
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                variant="outlined"
                required
            />
            <FormControl variant="outlined" required>
                <InputLabel id="typePrioritaryName-label">Regla de prioridad</InputLabel>
                <Select
                    labelId="typePrioritaryName-label"
                    id="typePrioritaryName"
                    name="idTypePrioritary"
                    value={formData.idTypePrioritary}
                    onChange={handleChange}
                    label="Regla de prioridad"
                >
                    <MenuItem value="">
                        <em>Seleccione una opción</em>
                    </MenuItem>
                    {mainPrio.map((option) => (
                        <MenuItem key={option.idTypePrioritary} value={option.idTypePrioritary}>
                            {option.typePrioritaryName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl variant="outlined" required>
                <InputLabel id="typeStockName-label">Tipo de empaque</InputLabel>
                <Select
                    labelId="typeStockName-label"
                    id="typeStockName"
                    name="idTypeStock"
                    value={formData.idTypeStock}
                    onChange={handleChange}
                    label="Tipo de empaque"
                    >
                    <MenuItem value="">
                        <em>Seleccione una opción</em>
                    </MenuItem>
                    {mainEmp.map((option) => (
                        <MenuItem key={option.idTypeStock} value={option.idTypeStock}>
                            {option.typeStockName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                id="purchesDate"
                label="Fecha de compra"
                type="date"
                name="purchesDate"
                value={formData.purchesDate.toISOString().split('T')[0]}
                onChange={handleDateChange}
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
                required
            />
            <TextField
                id="expirationDate"
                label="Fecha de expiración"
                type="date"
                name="expirationDate"
                value={formData.expirationDate.toISOString().split('T')[0]}
                onChange={handleDateChange}
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
                required
            />
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
            <div>
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
            </div>
        </form>
    );
};

export default FormInvC;
