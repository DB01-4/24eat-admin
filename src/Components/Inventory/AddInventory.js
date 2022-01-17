import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function AddInventory({ stateChanger, filter }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(filter);
  const [count, setCount] = useState(0);
  const { getAccessTokenSilently } = useAuth0();
  const [typeFilter, setTypeFilter] = useState(filter);

  const handleChange = (event) => {
    setTypeFilter(event.target.value);
  };

  useEffect(() => {
    console.log("USEFFECT ACTIVATED, filter: " + filter);
    register("type", { value: filter });
  }, [filter]);

  const onSubmit = async (data) => {
    const token = await getAccessTokenSilently();
    axios
      .post("https://db01-4-imsservice.herokuapp.com/api/private/post", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response);
        setCount(count + 1);
        stateChanger(count);
        console.log("changed count to: " + count);
      })
      .catch(function (error) {
        setCount(count + 1);
        console.log(error);
        console.log(data);
      });
  };

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

          {/* <TextField
            id="outlined-disabled"
            label="Type"
            value={filter}
            {...register("type", { required: true })}
          />
          {errors.exampleRequired && <p>This field is required</p>} */}
          <FormControl>
            <InputLabel>Type</InputLabel>
            <Select
              value={typeFilter}
              label="Type"
              onChange={handleChange}
              {...register("type", { required: true })}
            >
              <MenuItem value={"produce"}>Produce</MenuItem>
              <MenuItem value={"meat"}>Meat</MenuItem>
              <MenuItem value={"packaged"}>Packaged</MenuItem>
              <MenuItem value={"drinks"}>Drinks</MenuItem>
            </Select>
          </FormControl>

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
