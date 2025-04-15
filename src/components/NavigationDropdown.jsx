// src/components/NavigationDropdown.jsx
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const NavigationDropdown = ({ onChangePage }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (page) => {
    onChangePage(page);
    handleClose();
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '10px' }}>
      <Button
        id="navigation-button"
        aria-controls={open ? 'navigation-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
      >
        Navigate
      </Button>
      <Menu
        id="navigation-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleMenuItemClick("chart")}>Chart</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("portfolio")}>My Portfolio</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("stocks")}>Stock Information</MenuItem>
      </Menu>
    </div>
  );
};

export default NavigationDropdown;
