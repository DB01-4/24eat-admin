import React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "../Dish/dishedit.css";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  TextField,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";

export default function DishEdit(props) {
  const initialFValues = {
    name: "",
    description: null,
    allergies: '',
    nutrition: '',
    price: 0,
    category: "",
    image: "",
  };

  const { onClose, selectedCard, open, url, handleSuccesAlert, fetchDishes } =
    props;
  const [values, setValues] = useState(initialFValues);
  const [categories, setCategories] = useState(null);
  const dishUrl = "http://localhost:8080";
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const token = await getAccessTokenSilently();
    axios
      .get(`${dishUrl}/api/private/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setCategories(response.data);
      })
      .catch(function (error) {});
  };

  const getCategoryIndex = (id, categories) => {
    if (categories == null) {
      return "";
    }
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].id === id) {
        return i;
      }
    }
  };

  const handleClose = () => {
    onClose();
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    if (selectedCard != null) setValues({ ...selectedCard });
  }, [selectedCard]);

  const handleSubmit = async (e) => {
    const token = await getAccessTokenSilently();
    axios
      .put(`${dishUrl}/api/private/products/` + selectedCard.id, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function () {
        fetchDishes();
      })
      .catch(function () {})
      .finally(function () {
        handleSuccesAlert();
      });
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Edit Dish</DialogTitle>
      <form className="form">
        <div className="textfield">
          <TextField
            id="outlined-multiline-flexible"
            label="name"
            name="name"
            multiline
            maxRows={4}
            defaultValue={values.name}
            onChange={onChange}
          />
        </div>
        <div className="textfield">
          <TextField
            id="outlined-multiline-flexible"
            label="description"
            name="description"
            multiline
            maxRows={4}
            defaultValue={values.description}
            onChange={onChange}
          />
        </div>
        <div className="textfield">
          <TextField
            id="outlined-multiline-flexible"
            label="allergies"
            name="allergies"
            multiline
            maxRows={4}
            defaultValue={values.allergies}
            defaultValue={values.nutrition}
            onChange={onChange}
          />
        </div>
        <div className="textfield">
          <TextField
            id="outlined-multiline-flexible"
            label="price"
            name="price"
            type="number"
            multiline
            maxRows={4}
            defaultValue={values.price}
            onChange={onChange}
          />
        </div>
        //! category value doesn't change
        <div className="textfield">
          <InputLabel>Category</InputLabel>
          <Select
            id="outlined-multiline-flexible"
            label="category"
            name="category"
            onChange={onChange}
            defaultValue={
              categories &&
              categories[getCategoryIndex(values.category.id, categories)]
            }
          >
            {categories &&
              categories.map((category) => {
                return (
                  <MenuItem key={category.id} value={category}>
                    {category.name}
                  </MenuItem>
                );
              })}
          </Select>
        </div>
        <TextField
          id="outlined-multiline-flexible"
          label="image"
          name="image"
          multiline
          maxRows={4}
          defaultValue={values.image}
          onChange={onChange}
        />
      </form>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleSubmit} autoFocus>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DishEdit.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
