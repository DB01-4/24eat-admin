import React from "react";
import {useState} from "react";
import axios from "axios";
import "../Style/addCrud.css"
import useFetch from "../API/useFetch"; 
import {Button, TextField } from '@mui/material';
import { useHistory } from "react-router-dom";

export default function AddCategory(){
  let history = useHistory();

  const initialFValues = {
    name: '',
    description: null,
    image: ''
  }
  const [values, setValues] = useState(initialFValues);
  const categoryUrl  = "http://localhost:8080/categories/"
  const { data: categories, error, isPending } = useFetch(categoryUrl);

    

  const onChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
    console.log(values)
  }

  const handleSubmit = e => {
    axios.post(categoryUrl, values)
      .then(function (response) {
      console.log(response);
      history.push('/Category')
      })
      .catch(function (error) {
      console.log(error);
      });
    // window.location.reload(false);
  }
        
  
  return (
    <div>
      <h1>Add Categories</h1>
      <form>
        <div className="txtfield">
        <TextField
          id="outlined-multiline-flexible"
          label="Category name"
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
