import React from "react";
import {useState} from "react";
import axios from "axios";
import useFetch from "../API/useFetch";
import DishList from '../Components/DishList';
import {Button, TextField, Select, InputLabel, MenuItem} from '@mui/material';

export default function Dish(){

  const initialFValues = {
    name: '',
    description: null,
    allergies: '',
    price: 0,
    category: '',
    image: ''
  }
  const [values, setValues] = useState(initialFValues);
  const dishUrl  = "http://localhost:8080/products/"
  const { data: dishes, error, isPending } = useFetch(dishUrl);
  const { data: categories } = useFetch("http://localhost:8080/categories/"); 
    

  const onChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
    console.log(values)
  }

  const handleSubmit = e => {
    axios.post(dishUrl, values)
      .then(function (response) {
      console.log(response);
      })
      .catch(function (error) {
      console.log(error);
      });
    window.location.reload(false);
  }

  const handleDelete = data => 
    axios.delete(dishUrl + data.id)
      .then(function (response) {
      console.log(response);
      window.location.reload(false);
      })
      .catch(function (error) {
      console.log(error);
  });
        
  
  return (
    <div>
      <h1>Dishes</h1>
      <form>
        <TextField
          id="outlined-multiline-flexible"
          label="Dish name"
          name="name"
          multiline
          maxRows={4}
          onChange={onChange}
        />

        <TextField
          id="outlined-multiline-flexible"
          label="Description"
          name="description"
          multiline
          maxRows={4}
          onChange={onChange}
        />

        <TextField
          id="outlined-multiline-flexible"
          label="Allergies"
          name="allergies"
          multiline
          maxRows={4}
          onChange={onChange}
        />

        <TextField
          id="outlined-multiline-flexible"
          label="Price"
          name="price"
          type="Number"
          maxRows={1}
          onChange={onChange}
        />

        <InputLabel>Category</InputLabel>
        <Select
          id="outlined-multiline-flexible"
          label="Category"
          name="category"
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
          label="Image url"
          name="image"
          multiline
          maxRows={4}
          onChange={onChange}
        />

        </form>
        <Button onClick={handleSubmit} autoFocus>Submit</Button>
          { error && <div>{ error }</div> }
          { isPending && <div>Loading...</div> }
          { dishes && <DishList onDelete={handleDelete} url={dishUrl} dishes={dishes} /> }
    </div>
  )
}