"use client";
import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Box, FormControlLabel, Switch } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
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
    typePrioritaryName?: string;
    idTypeStock: number;
    typeStockName?: string;
    purchesDate: Date;
    expirationDate: Date;
    active: boolean;
}

interface invApiMain { //estructura del objeto que se trae del api
    success: boolean;
    data: invMain;
}

const FormInvD: React.FC<FormProps> = ({ onClose }) => {

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
                const priority = mainPrio.find(p => p.idTypePrioritary === response.data.idTypePrioritary);
                console.log("Priority found:", priority);
                const stock = mainEmp.find(s => s.idTypeStock === response.data.idTypeStock);
                console.log("Stock found:", stock);
                
            // Verificar si 'priority' es null o undefined
            if (priority) {
                console.log("Prioridad:", priority.typePrioritaryName);
            }
            if (stock) {
                console.log("stock:", stock.typeStockName);
            }
                setFormData({
                    ...response.data,
                    typePrioritaryName: priority ? priority.typePrioritaryName : "Desconocido",
                    typeStockName: stock ? stock.typeStockName : "Desconocido",
                });
    
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
    

    const handleDelete = async () => {
        if (searchId === '' || typeof searchId !== 'number') {
            setAlertMessage('Por favor, ingresa un ID válido para eliminar.');
            setAlertSeverity('warning');
            setOpenAlert(true);
            return;
        }

        try {
            const response = await apiServices.deleteData<{
                success: boolean;
                data: invMain;
            }>(`Inventario/DeleteArt/${searchId}`);

            if (response.success) {
                setAlertMessage(`Artículo eliminado correctamente.`);
                setAlertSeverity('success');
                setOpenAlert(true);
                setFormData(initialState); // Limpia los datos en pantalla
                setTimeout(() => {
                    onClose(); // Cerrar formulario después de 7 segundos
                }, 1300);
            } else {
                setAlertMessage('No se pudo eliminar el artículo.');
                setAlertSeverity('error');
                setOpenAlert(true);
            }
        } catch (error) {
            console.error("Error al eliminar el artículo:", error);
            setAlertMessage('Ocurrió un error al intentar eliminar el artículo.');
            setAlertSeverity('error');
            setOpenAlert(true);
        }
    };

    const handleCancel = () => {
        setFormData(initialState); // Resetear los campos del formulario
        onClose(); // Cerrar el diálogo
    };

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Formulario eliminar artículo
            </Typography>
            <div>
                {/* <label>Search by ID:</label>
                <input
                    type="number"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value ? Number(e.target.value) : '')}
                /> */}
                {/* <button type="button" onClick={handleSearch}>
                    Search
                </button> */}
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
                />
                <Button type="button" onClick={handleSearch} variant="contained" startIcon={<SearchIcon />}>Buscar</Button>
            </div>
            <br />
            {formData && (
                <div>
                    <h3>Item Details:</h3>
                    <br />
                    <p>
                        <strong>Name:</strong> {formData.itemName}
                    </p>
                    <br />
                    <p>
                        <strong>Stock:</strong> {formData.stock}
                    </p>
                    <br />
                    <p>
                        <strong>Type Prioritary:</strong> {formData.typePrioritaryName ?? "No disponible"}
                    </p>
                    <br />
                    <p>
                        <strong>Type Stock:</strong> {formData.typeStockName ?? "No disponible"}
                    </p>
                    <br />
                    <p>
                        <strong>Purchase Date:</strong> {formatDate(formData.purchesDate)}
                    </p>
                    <br />
                    <p>
                        <strong>Expiration Date:</strong> {formatDate(formData.expirationDate)}
                    </p>
                    <br />
                    <p>
                        <FormControlLabel
                            control={
                                <Switch
                                    id="active"
                                    name="active"
                                    checked={formData.active}
                                    readOnly
                                />
                            }
                            label="Activo"
                        />
                    </p>
                    <br />
                    <Button color="secondary" type="button" onClick={handleDelete} variant="contained" startIcon={<DeleteIcon />} className="button-spacing">
                        Delete
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
            )}
        </div>
    );
};

export default FormInvD;
