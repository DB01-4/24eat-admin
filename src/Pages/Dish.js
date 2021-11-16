import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../Style/categories.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useFetch from "../API/useFetch";
import DishList from "../Components/DishList";

export default function Dish(){

  const url  = "http://localhost:8080/products/"

  const { data: dishes, error, isPending } = useFetch(url);

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
                  <h1>Edit or delete dishes</h1>
              </div>

              { error && <div>{ error }</div> }
              { isPending && <div>Loading...</div> }
              { dishes && <DishList onDelete={handleDelete} url={url} dishes={dishes} /> }
          </div>
      )
}