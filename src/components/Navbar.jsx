// src/components/Navbar.jsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Navbar = ({ cash }) => {
  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #AA98F3, #21CB93)' }}>
      <Toolbar>
        <Typography variant="h6" style={{fontWeight: "bold"}} component="div" sx={{ flexGrow: 1 }}>
          Stock Trading Simulator
        </Typography>
        <Typography variant="subtitle1">
          Cash: ${cash.toFixed(2)}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
