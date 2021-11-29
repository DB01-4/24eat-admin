import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../Style/categories.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useFetch from "../API/useFetch";
import CategoryList from "../Components/Category/CategoryList";

export default function Category(){

  const url  = "http://localhost:8080/categories/"

  const { data: categories, error, isPending } = useFetch(url);
  
  const handleDelete = data => 
  axios.delete(url+data.id)
    .then(function (response) {
      console.log(response);
      window.location.reload(false);
    })
    .catch(function (error) {
      console.log(error);
  });

      return (
          <div>
              <div>
                  <h1>Categories</h1>
              </div>
              <div>
                  <Button variant="contained" href="/AddCategory">Add category</Button>
              </div>


              { error && <div>{ error }</div> }
              { isPending && <div>Loading...</div> }
              { categories && <CategoryList onDelete={handleDelete} url={url} categories={categories} /> }
          </div>
      )
}