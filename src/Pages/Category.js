import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../Style/categories.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useFetch from "../API/useFetch";
import CategoryList from "../Components/CategoryList";

export default function Category() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) =>
    axios
      .post("http://localhost:8080/categories", data)
      .then(function (response) {
        console.log(response);
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
        console.log(data);
      });

  return (
    <div>
      <h1>Category</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue="test" {...register("name", { required: true })} />
        {errors.exampleRequired && <p>This field is required</p>}

        <input {...register("description", { required: true })} />
        {errors.exampleRequired && <p>This field is required</p>}

        <input {...register("image", { required: true })} />
        {errors.exampleRequired && <p>This field is required</p>}

        <input type="submit" />
      </form>
      <button> add category</button>
    </div>
  );
}
