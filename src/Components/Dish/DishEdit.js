import React from "react";
import { useEffect, useState} from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import {Dialog, DialogActions, DialogTitle, Button, TextField, Select, InputLabel, MenuItem, Switch} from '@mui/material';
import useFetch from "../../API/useFetch";
import FormControl from '@mui/material/FormControl';
import "../../Style/FormEdit.css";

export default function DishEdit(props) {

  const initialFValues = {
    name: '',
    description: null,
    allergies: '',
    nutrition: '',
    price: 0,
    category: '',
    image: '',
    inStock: false
  }

  const { onClose, selectedCard, open, url, handleSuccesAlert, fetchDishes } = props;
  const [values, setValues] = useState(initialFValues);
  const { data: categories } = useFetch("https://db01-4-menuservice.herokuapp.com/api/public/categories"); 

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
    if (e.target.checked !== undefined ) {
      setValues({
        ...values,
        [name]: e.target.checked
      })
    }else{
      setValues({
        ...values,
        [name]: value
      })
    }
}


useEffect(() => {
    console.log(values)
  }, [values])

  useEffect(() => {
    if (selectedCard != null)
        setValues({...selectedCard})
}, [selectedCard])

  const handleSubmit = e => {
  axios.put(url+selectedCard.id, values)
    .then(function () {
      fetchDishes()
    })
    .catch(function () {
  })
  .finally(function () {
    handleSuccesAlert()
  });
  handleClose();
}


  return (
    <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Edit Dish</DialogTitle>
        <form 
        class="form"
        className="form"
        onSubmit={handleSubmit}
        >
          <div className="inputfield">
          <TextField
          required
          id="outlined-multiline-flexible"
          label="name"
          name="name"
          multiline
          maxRows={4}
          defaultValue={values.name}
          onChange={onChange}
          />
          </div>


          <div className="inputfield">
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

          <div className="inputfield">
            <TextField
            id="outlined-multiline-flexible"
            label="allergies"
            name="allergies"
            multiline
            maxRows={4}
            defaultValue={values.allergies}
            onChange={onChange}
            />
          </div>

          <div className="inputfield">
            <TextField
            id="outlined-multiline-flexible"
            label="nutrition"
            name="nutrition"
            multiline
            maxRows={4}
            defaultValue={values.nutrition}
            onChange={onChange}
            />  
          </div>


          <div className="inputfield">
            <TextField
            required
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

          
          <div className="switch inputfield">
            <InputLabel>in stock</InputLabel>
            <Switch
            checked={values.inStock}
            onChange={onChange}
            label="inStock"
            name="inStock"
            />
          </div>
          
          <div className="inputfield">
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
          </div>

          <div className="inputfield">
            <TextField
            id="outlined-multiline-flexible"
            label="image"
            name="image"
            multiline
            maxRows={4}
            defaultValue={values.image}
            onChange={onChange}
            />
          </div>

          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button type="submit" autoFocus>Submit</Button>
          </DialogActions>

        </form>

    </Dialog>
  );
}

DishEdit.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};