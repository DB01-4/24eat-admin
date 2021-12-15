import React from 'react';
import { useState } from "react";
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import Dialog from './CategoryEdit';
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";


export default function CategoryList  (props) {

  const { categories, url, handleSuccesAlert, fetchCategories } = props
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState();

  const { getAccessTokenSilently } = useAuth0();

  const handleClickOpen = (value) => {
    setSelectedCard({ ...value, value });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteCategories = async (data) => {
    try {
      //get access token to make request
      const token = await getAccessTokenSilently();

      //private endpoint
      axios
        .delete(`${url}/api/private/categories/${data.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          fetchCategories();
          handleSuccesAlert();
        });
    } catch (error) {
      console.log(error);
    }
  };

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
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {category.id}
                </TableCell>
                <TableCell data-testid="category-name" align="left">
                  {category.name}
                </TableCell>
                <TableCell data-testid="category-description" align="left">
                  {category.description}
                </TableCell>
                <TableCell align="left">
                  <Button onClick={() => handleClickOpen(category)}>
                    Edit
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button onClick={() => deleteCategories(category)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
