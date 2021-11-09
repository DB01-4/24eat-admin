import React from 'react';
import { useState } from 'react';
import {Card, CardContent, CardActionArea, Button, Typography} from '@mui/material';
import axios from "axios";
import Dialog from './CategoryEdit';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function CategoryList  (props) {

  const { categories, url, onDelete } = props
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState();



  const handleClickOpen = (value) => {
    setSelectedCard({...value, value})
    console.log(selectedCard)
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
              <TableCell align="left">{category.name}</TableCell>
              <TableCell align="left">{category.description}</TableCell>
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
