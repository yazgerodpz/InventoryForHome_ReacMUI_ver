"use client";
import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, FormControlLabel, Switch, MenuItem, Select, InputLabel, FormControl, } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
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

interface invMain {
    idItem: number;
    itemName: string;
    stock: number;
    idTypePrioritary: number;
    idTypeStock: number;
    purchesDate: Date;
    expirationDate: Date;
    active: boolean;
}

interface invApiMain { //estructura del objeto que se trae del api
    success: boolean;
    data: invMain;
}

const FormInvU: React.FC<FormProps> = ({ onClose }) => {

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

    const initialState: invMain = {
        idItem: 0,
        itemName: "",
        stock: 0,
        idTypePrioritary: 0,
        idTypeStock: 0,
        purchesDate: new Date(),
        expirationDate: new Date(),
        active: true,
    };

   

    const formatDate = (date: Date): string => {
        if (!date) return ""; // Evita errores si date es null o undefined

        // Si ya es un Date válido, lo formateamos
        if (date instanceof Date && !isNaN(date.getTime())) {
            return date.toISOString().split("T")[0]; // Convierte Date a YYYY-MM-DD
        }

        // Si llega como string (ej: "2024-03-10T15:30:00Z"), intenta convertirlo a Date
        const parsedDate = new Date(date);
        if (!isNaN(parsedDate.getTime())) {
            return parsedDate.toISOString().split("T")[0];
        }

        return ""; // Retorna vacío si no se puede convertir
      };

    const [formData, setFormData] = useState<invMain>(initialState);
    const [searchId, setSearchId] = useState<number | ''>(''); // Para buscar por id
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');
    const [openAlert, setOpenAlert] = useState(false);
    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    const handleSearch = async () => {
        if (searchId === '') {
            setAlertMessage('Por favor, ingresa un ID.');
            setOpenAlert(true);
            return;
        }
        try {
            const response: invApiMain = await apiServices.getData(`Inventario/ReadInvById/${searchId}`);

            if (response.success && response.data) {
                setFormData(response.data);
                setAlertMessage("Artículo encontrado.");
                setOpenAlert(true);
            } else {
                setAlertMessage("ID no encontrado.");
                setFormData(initialState);
                setOpenAlert(true);
            }
        } catch (error) {
            console.error("Error en la búsqueda:", error);
            setAlertMessage("Ocurrió un error al buscar la regla.");
            setFormData(initialState);
            setOpenAlert(true);
        }
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : name === 'stock' ? Number(value) : value,
        }));
    };

    const handleChangeStock = (e: React.ChangeEvent<{ value: unknown }>) => {
        const { value } = e.target;

        setFormData((prev) => ({
            ...prev,
            idTypeStock: value as number, // Aseguramos que el valor es un número
        }));
    };

    const handleChangePriority = (e: React.ChangeEvent<{ value: unknown }>) => {
        const { value } = e.target;

        setFormData((prev) => ({
            ...prev,
            idTypePrioritary: value as number, // Aseguramos que el valor es un número
        }));
    };

    // const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;

    //     setFormData((prev) => ({
    //         ...prev,
    //         [name]: new Date(value),
    //     }));
    // };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
          ...prev,
          [name]: new Date(value), // Convertir string YYYY-MM-DD de nuevo a Date
        }));
      };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Aquí puedes agregar la lógica para enviar los datos al servidor o hacer alguna otra acción
        try {
            const response = await apiServices.postData<{
                success: boolean;
                data: invMain;
            }>("Inventario/EditarInv/actItem", formData);
            console.log('nueva regla de prioridad creada:', response);
            if (response.success) {
                //Alerta
                setAlertMessage("Artículo actualizado exitosamente");
                setAlertSeverity("success");
                setOpenAlert(true);
                // se reinicia el formulario
                setFormData({

                    idItem: 0,
                    itemName: "",
                    stock: 0,
                    idTypePrioritary: 0,
                    idTypeStock: 0,
                    purchesDate: new Date,
                    expirationDate: new Date,
                    active: true
                });

                setTimeout(() => {
                    onClose(); // Cerrar formulario después de 7 segundos
                }, 1300);
            } else {
                setAlertMessage("Error al actualizar el artículo");
                setAlertSeverity("error");
                setOpenAlert(true);
            }
        } catch (error) {
            console.error("Error al enviar datos:", error);
            setAlertMessage("Error al actualizar el artículo. Revisa la consola para más detalles.");
            setAlertSeverity("error");
            setOpenAlert(true);
        }
    };

    const handleCancel = () => {
        setFormData(initialState); // Resetear los campos del formulario
        onClose(); // Cerrar el diálogo
    };

    return (
        <div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <Typography variant="h5" gutterBottom>
                    Formulario actualizar artículos
                </Typography>
                <div>
                    <TextField
                        id="searchId"
                        label="Buscar por ID"
                        type="number"
                        value={searchId || ""}
                        onChange={(e) => setSearchId(e.target.value ? parseInt(e.target.value) : "")}
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                    // variant="outlined"
                    />
                    <Button type="button" onClick={handleSearch} variant="contained" startIcon={<SearchIcon />}>Buscar</Button>
                </div>

                <div>
                    <TextField
                        id="itemName"
                        label="Nombre del artículo"
                        name="itemName"
                        value={formData.itemName}
                        onChange={handleChange}
                        variant="outlined"
                        required
                        style={{ marginTop: '10px' }}
                    />
                    {/* <TextField
                        label="Item Name"
                        name="itemName"
                        value={formData.itemName}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        required
                    /> */}
                </div>
                <div>
                    <TextField
                        label="Stock"
                        name="stock"
                        type="number"
                        value={formData.stock}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        required
                    />
                </div>
                <div>
                    {/* <FormControl fullWidth>
                        <InputLabel>Regla de Prioridad</InputLabel>
                        <Select
                            name="typePrioritaryName"
                            value={formData.typePrioritaryName}
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>Seleccione una opción</em>
                            </MenuItem>
                            {priorityOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl> */}
                    <FormControl fullWidth>
                        <InputLabel>Regla de Prioridad</InputLabel>
                        <Select
                            name="idTypePrioritary" // El nombre del campo que se actualiza
                            value={formData.idTypePrioritary} // El valor seleccionado en el campo de prioridad
                            onChange={handleChangePriority} // Llama a la función handleChangePriority para actualizar el estado
                        >
                            <MenuItem value="">
                                <em>Seleccione una regla de prioridad</em>
                            </MenuItem>
                            {mainPrio.map((option) => ( // Aquí `mainPrio` es la lista de opciones de prioridad obtenida
                                <MenuItem key={option.idTypePrioritary} value={option.idTypePrioritary}>
                                    {option.typePrioritaryName} {/* Nombre de la prioridad */}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    {/* <FormControl fullWidth>
                        <InputLabel>Tipo de Empaque</InputLabel>
                        <Select
                            name="typeStockName"
                            value={formData.typeStockName}
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>Seleccione una opción</em>
                            </MenuItem>
                            {stockTypeOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl> */}
                    <FormControl fullWidth>
                        <InputLabel>Tipo de Stock</InputLabel>
                        <Select
                            name="idTypeStock" // El nombre del campo que se actualiza
                            value={formData.idTypeStock} // El valor seleccionado en el campo de stock
                            onChange={handleChangeStock} // Llama a la función handleChangeStock para actualizar el estado
                        >
                            <MenuItem value="">
                                <em>Seleccione un tipo de stock</em>
                            </MenuItem>
                            {mainEmp.map((option) => ( // Aquí `mainStock` es la lista de opciones de stock obtenida
                                <MenuItem key={option.idTypeStock} value={option.idTypeStock}>
                                    {option.typeStockName} {/* Nombre del tipo de stock */}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </div>
                <div>
                    {/* <TextField
                        label="Purchase Date"
                        name="purchesDate"
                        type="date"
                        value={formData.purchesDate.toISOString().split('T')[0]}
                        onChange={handleDateChange}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    /> */}
                    <TextField
                                    id="purchesDate"
                                    label="Fecha de compra"
                                    type="date"
                                    name="purchesDate"
                                    value={formatDate(formData.purchesDate)}
                                    onChange={handleDateChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    required
                                />
                </div>
                <div>
                    <TextField
                        label="Expiration Date"
                        name="expirationDate"
                        type="date"
                        value={formatDate(formData.expirationDate)}
                        onChange={handleDateChange}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                </div>
                <div>
                    <FormControlLabel
                        control={
                            <Switch
                                id="active"
                                name="active"
                                checked={formData.active}
                                onChange={handleChange}
                            />
                        }
                        label="Activo"
                    />
                </div>
                <div>
                    <Button
                        color="success"
                        type="submit"
                        variant="contained"
                        startIcon={<SaveIcon />}
                    >
                        Guardar
                    </Button>
                    <Button
                        color="error"
                        type="button"
                        onClick={handleCancel}
                        variant="contained"
                        startIcon={<CancelIcon />}
                    >
                        Cancelar
                    </Button>
                    <Snackbar open={openAlert} autoHideDuration={11000} onClose={handleCloseAlert}>
                        <Alert onClose={handleCloseAlert} severity={alertSeverity} sx={{ width: '100%' }}>
                            {alertMessage}
                        </Alert>
                    </Snackbar>
                </div>
            </form>
        </div>
    );
};

export default FormInvU;
