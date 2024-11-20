import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Empaques from './Empaques';
import Inventario from './Inventario';
import ReglaPrio from './Prioridad';
import FormEmpC from './Components/FormEmpC';
import FormEmpU from './Components/FormEmpU';
import FormEmpD from './Components/FormEmpD';
import FormPrioC from './Components/FormPrioC';
import FormPrioU from './Components/FormPrioU';
import FormPrioD from './Components/FormPrioD';
import FormInvC from './Components/FormInvC';
import FormInvU from './Components/FormInvU';
import FormInvD from './Components/FormInvD';


export default function Home() {

  const card = (
    <React.Fragment>
      <CardContent>
        {/* <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          Word of the Day
        </Typography> */}
        <Typography variant="h5" component="div">
          Bienvenido Usuario
          <AccountCircleIcon></AccountCircleIcon>
        </Typography>
      </CardContent>
      <CardActions>          
      </CardActions>
    </React.Fragment>
  );

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
        <Card variant="outlined" className="w-full">{card}</Card>
        TABLA INV
        <Inventario></Inventario>
        TABLA PRIO
        <ReglaPrio></ReglaPrio>
        TABLA STOCKTYPE
        <Empaques></Empaques>
        FormEmpC
        <FormEmpC></FormEmpC>
        FormEmpU
        <FormEmpU></FormEmpU>
        FormEmpD
        <FormEmpD></FormEmpD>
        FormPrioC
        <FormPrioC></FormPrioC>
        FormPrioU
        <FormPrioU></FormPrioU>
        FormPrioD
        <FormPrioD></FormPrioD>
        FormIvnC
        <FormInvC></FormInvC>
        FormIvnU
        <FormInvU></FormInvU>
        FormIvnD
        <FormInvD></FormInvD>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        *
      </footer>
    </div>
  );
}


