import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function AddInventory({ stateChanger, filter }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(filter);
  const [count, setCount] = useState(0);
  const onSubmit = async (data) =>
    axios
      .post("http://localhost:8084/api/post", data)
      .then(function (response) {
        console.log(response);
        setCount(count + 1);
        stateChanger(count);
        console.log("changed count to: " + count);
      })
      .catch(function (error) {
        console.log(error);
        console.log(data);
      });

  return (
    <div className="flex-child">
      <div>
        <h1></h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="filled-basic"
            label="Name"
            variant="filled"
            {...register("name", { required: true })}
          />
          {errors.exampleRequired && <p>This field is required</p>}

          <TextField
            disabled
            id="outlined-disabled"
            label="Type"
            value={filter}
            {...register("type", { value: "produce" })}
          />
          {errors.exampleRequired && <p>This field is required</p>}

          <TextField
            type="number"
            id="filled-basic"
            label="Quantity"
            variant="filled"
            inputProps={{
              step: "0.001",
            }}
            {...register("quantity", { required: true })}
          />
          {errors.exampleRequired && <p>This field is required</p>}
          <div>
            <Button variant="outlined" type="submit">
              Add Item
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
