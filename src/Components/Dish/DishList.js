import React from "react";
import { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Dialog from "./DishEdit";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export default function DishList(props) {
  const { dishes, url, onDelete, handleSuccesAlert, fetchDishes } = props;
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState();

  const serverUrl = "http://localhost:8080";

  const { getAccessTokenSilently } = useAuth0();

  const handleClickOpen = (value) => {
    setSelectedCard({ ...value, value });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (data) => {
    try {
      const token = await getAccessTokenSilently();

      axios
        .delete(`${serverUrl}/api/private/products/${data.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          fetchDishes();
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
        fetchDishes={fetchDishes}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Id</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">price</TableCell>
              <TableCell align="left">allergies</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dishes.map((dish) => (
              <TableRow
                key={dish.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {dish.id}
                </TableCell>
                <TableCell align="left">{dish.name}</TableCell>
                <TableCell align="left">{dish.description}</TableCell>
                <TableCell align="left">{dish.price}</TableCell>
                <TableCell align="left">{dish.allergies}</TableCell>
                <TableCell align="left">
                  <Button onClick={() => handleClickOpen(dish)}>Edit</Button>
                </TableCell>
                <TableCell align="left">
                  <Button onClick={() => handleDelete(dish)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
