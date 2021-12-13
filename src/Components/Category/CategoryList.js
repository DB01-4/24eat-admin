import React from 'react';
import { useState } from 'react';
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import Dialog from './CategoryEdit';


export default function CategoryList  (props) {

  const { categories, url, onDelete, handleSuccesAlert, fetchCategories } = props
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState();


  const handleClickOpen = (value) => {
    setSelectedCard({...value, value})
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);

  };

  const handleDelete = (data) => {
    onDelete(data);
  }

  return (
    <div>
      <Dialog
        selectedCard={selectedCard}
        open={open}
        onClose={handleClose}
        url={url}
        handleSuccesAlert={handleSuccesAlert}
        fetchCategories={fetchCategories}
        />
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Id</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow
              key={category.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {category.id}
              </TableCell>
              <TableCell data-testid="category-name" align="left">{category.name}</TableCell>
              <TableCell data-testid="category-description" align="left">{category.description}</TableCell>
              <TableCell align="left"><Button onClick={() => handleClickOpen(category)}>Edit</Button></TableCell>
              <TableCell align="left"><Button onClick={() => handleDelete(category)}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
