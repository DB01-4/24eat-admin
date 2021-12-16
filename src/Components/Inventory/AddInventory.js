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
  const onSubmit = (data) =>
    axios
      .post("https://db01-4-imsservice.herokuapp.com/api/post", data)
      .then(function (response) {
        console.log(response);
        setCount(count + 1);
        stateChanger(count);
      })
      .catch(function (error) {
        console.log(error);
        console.log(data);
      });

  return (
    <div className="flex-child">
      <div>
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
