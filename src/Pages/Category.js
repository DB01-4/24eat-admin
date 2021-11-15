import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

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
