import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


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
        TABLA PRIO
        TABLA STOCKTYPE
        FOrmC
        FOrmC
        FOrmC
        FoRME
        FoRME
        FoRME
        formD
        formD
        formD
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        *
      </footer>
    </div>
  );
}


