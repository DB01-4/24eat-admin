import React from "react";
import {useState} from "react";
import axios from "axios";
import useFetch from "../API/useFetch";
import "../Style/addCrud.css"
import {Button, TextField, Select, InputLabel, MenuItem} from '@mui/material';

export default function AddDish(){

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
        <div className="txtfield">
        <TextField
          id="outlined-multiline-flexible"
          label="Dish name"
          name="name"
          multiline
          maxRows={4}
          onChange={onChange}
        />
        </div>

        <div className="txtfield">
        <TextField
          id="outlined-multiline-flexible"
          label="Description"
          name="description"
          multiline
          maxRows={4}
          onChange={onChange}
        />
        </div>

        <div className="txtfield">
        <TextField
          id="outlined-multiline-flexible"
          label="Allergies"
          name="allergies"
          multiline
          maxRows={4}
          onChange={onChange}
        />
        </div>

        <div className="txtfield">
        <TextField
          id="outlined-multiline-flexible"
          label="Price"
          name="price"
          type="Number"
          maxRows={1}
          onChange={onChange}
        />
        </div>

        <div className="txtfield">
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
        </div>

        <div className="txtfield">
        <TextField
          id="outlined-multiline-flexible"
          label="Image url"
          name="image"
          multiline
          maxRows={4}
          onChange={onChange}
        />
        </div>

        </form>
        <div className="btn">
        <Button onClick={handleSubmit} autoFocus>Submit</Button>
        </div>
    </div>
  )
}
