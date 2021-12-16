import React from "react";
import { useState } from "react";
import axios from "axios";
import "../Style/addCrud.css";
import { Button, TextField } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function AddCategory() {
  let history = useHistory();

  const initialFValues = {
    name: "",
    description: null,
    image: "",
  };
  const [values, setValues] = useState(initialFValues);
  const categoryUrl  = "https://db01-4-menuservice.herokuapp.com/"
  const { getAccessTokenSilently } = useAuth0();

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    const token = await getAccessTokenSilently();
    axios
      .post(`${categoryUrl}api/private/categories`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function () {
        history.push("/Category");
      })
      .catch(function () {});
  };

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
        <Button onClick={handleSubmit} autoFocus>
          Submit
        </Button>
      </div>
    </div>
  );
}
