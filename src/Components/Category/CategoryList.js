import React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  Button,
  Typography,
} from "@mui/material";
import Dialog from "./CategoryEdit";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export default function CategoryList(props) {
  const { categorie, url, onDelete } = props;
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState();

  const serverUrl = "http://localhost:8080";

  const { getAccessTokenSilently, isLoading, user } = useAuth0();

  const [categories, setCategories] = useState([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        //get token access token to make request
        const token = await getAccessTokenSilently();

        //private endpoint
        axios
          .get(`${serverUrl}/api/private/categories`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((categories) => {
            setCategories(categories.data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    if (isLoading === false) {
      fetchCategories();
    }
  }, [isLoading]);

  const handleClickOpen = (value) => {
    setSelectedCard({ ...value, value });
    console.log(selectedCard);
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
        .delete(`${serverUrl}/api/private/categories/${data.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((categories) => {
          setCategories(categories.data);
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
