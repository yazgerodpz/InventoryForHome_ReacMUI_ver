"use client";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';

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
        {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => {
            return (
                <ListItem key={text} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
            );
        })} */}
        <ListItem key={'Incio'} disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <HomeIcon /> 
                </ListItemIcon>
                <ListItemText primary={'INICIO'} />
            </ListItemButton>
        </ListItem>
        <ListItem key={'Inventario'} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <InventoryIcon /> 
                        </ListItemIcon>
                        <ListItemText primary={'PRUEBA'} />
                    </ListItemButton>
        </ListItem>
        <ListItem key={'PRUEBA2'} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon /> 
                        </ListItemIcon>
                        <ListItemText primary={'PRUEBA'} />
                    </ListItemButton>
        </ListItem>
        <ListItem key={'PRUEBA3'} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon /> 
                        </ListItemIcon>
                        <ListItemText primary={'PRUEBA'} />
                    </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))} */}
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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


