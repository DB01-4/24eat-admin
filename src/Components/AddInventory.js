import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Inventory() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) =>
    axios
      .post("http://localhost:8084/api/post", data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        console.log(data);
      });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue="test" {...register("name", { required: true })} />
        {errors.exampleRequired && <p>This field is required</p>}

        <input {...register("type", { required: true })} />
        {errors.exampleRequired && <p>This field is required</p>}

        <input {...register("quantity", { required: true })} />
        {errors.exampleRequired && <p>This field is required</p>}

        <input type="submit" />
      </form>
      <button> add category</button>
    </div>
  );
}
