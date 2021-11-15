import React from "react";
import { useEffect, useState} from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import {Dialog, DialogActions, DialogTitle, Button, TextField, Select, InputLabel, MenuItem} from '@mui/material';
import useFetch from "../API/useFetch";


export default function DishEdit(props) {

  const initialFValues = {
    name: '',
    description: null,
    allergies: '',
    price: 0,
    category: '',
    image: ''
  }

  const { onClose, selectedCard, open, url} = props;
  const [values, setValues] = useState(initialFValues);
  const { data: categories } = useFetch("http://localhost:8080/categories/"); 

 const getCategoryIndex = (id, categories) => {
   if(categories == null){return ''}
   for (let i = 0; i < categories.length; i++) {
      if(categories[i].id === id) {
        return i;
      }
   }
 }



  const handleClose = () => {
    onClose();
  };

  const onChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
  })
    console.log(values)
}

  useEffect(() => {
    console.log("test")
    if (selectedCard != null)
        setValues({...selectedCard})
}, [selectedCard])

  const handleSubmit = e => {
    console.log(values)
  axios.put(url+selectedCard.id, values)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
     console.log(error);
  });
  window.location.reload(false);
  handleClose();
}


  return (
    <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Edit Dish</DialogTitle>
        <form>
          <TextField
           id="outlined-multiline-flexible"
           label="name"
           name="name"
           multiline
           maxRows={4}
           defaultValue={values.name}
           onChange={onChange}
          />



            <TextField
           id="outlined-multiline-flexible"
           label="description"
           name="description"
           multiline
           maxRows={4}
           defaultValue={values.description}
           onChange={onChange}
          />


            <TextField
           id="outlined-multiline-flexible"
           label="allergies"
           name="allergies"
           multiline
           maxRows={4}
           defaultValue={values.allergies}
           onChange={onChange}
          />



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

          <InputLabel>Category</InputLabel>
          <Select
            id="outlined-multiline-flexible"
            label="category"
            name="category"
            defaultValue={categories && categories[getCategoryIndex(values.category.id, categories)]}
            //renderValue=
            onChange={onChange}
          >
            {categories && categories.map(category => {
              return (
              <MenuItem key={category.id} value={category}>{category.name}</MenuItem>
              )}
              )}
          </Select>

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
          <Button onClick={handleSubmit} autoFocus>Submit</Button>
        </DialogActions>
    </Dialog>
  );
}

DishEdit.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};