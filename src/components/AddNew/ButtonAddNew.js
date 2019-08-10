import React from 'react';
import Button from '@material-ui/core/Button';

const ButtonAddNew = ({ handleClickOpen }) => {
  return (
    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
      Add New Recipe!
    </Button>
  );
};

export default ButtonAddNew;
