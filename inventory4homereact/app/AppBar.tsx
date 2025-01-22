"use client";
import * as React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import TakeoutDiningIcon from '@mui/icons-material/TakeoutDining';
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

export default function ButtonAppBar() {

  const [open, setOpen] = React.useState(false);


  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  


  //AQUI ESTA EL CAJON DE MENU
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem key={'Incio'} disablePadding >
          <Link href="/" passHref>  {/* Usamos Link de Next.js */}
            <ListItemButton>
                <ListItemIcon>
                    <HomeIcon /> 
                </ListItemIcon>
                <ListItemText primary={'INICIO'} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key={'Inventario'} disablePadding>
          <Link href="/inventario" passHref>  {/* Usamos Link de Next.js */}
                      <ListItemButton>
                          <ListItemIcon>
                              <InventoryIcon /> 
                          </ListItemIcon>
                          <ListItemText primary={'INVENTARIO'} />
                      </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key={'Regla de prioridad'} disablePadding>
          <Link href="/prioridades" passHref>  {/* Usamos Link de Next.js */}
                    <ListItemButton>
                        <ListItemIcon>
                            <LowPriorityIcon /> 
                        </ListItemIcon>
                        <ListItemText primary={'REGLA DE PRIORIDAD'} />
                    </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key={'Empaques'} disablePadding>
          <Link href="/empaques" passHref>  {/* Usamos Link de Next.js */}
                    <ListItemButton >
                        <ListItemIcon>
                            <TakeoutDiningIcon /> 
                        </ListItemIcon>
                        <ListItemText primary={'EMPAQUES'} />
                    </ListItemButton>
          </Link>
        </ListItem>
      </List>
      <Divider />
      <List>
      </List>
    </Box>
  );

  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" gutterBottom>
              Inventory For Home
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </Box>
  );
}


