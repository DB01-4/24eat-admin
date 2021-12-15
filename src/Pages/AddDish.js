import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "../Style/addCrud.css";
import { Button, TextField, Select, InputLabel, MenuItem } from "@mui/material";
import { useHistory } from "react-router-dom";
import Loading from "../Components/Login/Loading";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";

const AddDish = () => {
  let history = useHistory();

  const initialFValues = {
    name: "",
    description: null,
    allergies: "",
    price: 0,
    category: "",
    image: "",
  };
  const [values, setValues] = useState(initialFValues);
  const dishUrl = "http://localhost:8080";
  const [categories, setCategories] = useState(null);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    fetchcat();
  }, []);

  const fetchcat = async () => {
    const token = await getAccessTokenSilently();
    axios
      .get(`${dishUrl}/api/private/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setCategories(response.data);
      })
      .catch(function (error) {});
  };

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
      .post(`${dishUrl}/api/private/products`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function () {
        history.push("/Dish");
      })
      .catch(function () {});
  };

  return (
    <div>
      <h1>Dishes</h1>
      <form>
        <div className="txtfield">
          <TextField
            id="outlined-multiline-flexible"
            label="Dish name"
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
            label="Allergies"
            name="allergies"
            multiline
            maxRows={4}
            onChange={onChange}
          />
        </div>

        <div className="txtfield">
          <TextField
            id="outlined-multiline-flexible"
            label="Price"
            name="price"
            type="Number"
            maxRows={1}
            onChange={onChange}
          />
        </div>

        <div className="txtfield">
          <InputLabel>Category</InputLabel>
          <Select
            id="outlined-multiline-flexible"
            label="Category"
            name="category"
            onChange={onChange}
          >
            {categories &&
              categories.map((category) => {
                return (
                  <MenuItem key={category.id} value={category}>
                    {category.name}
                  </MenuItem>
                );
              })}
          </Select>
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
};

export default withAuthenticationRequired(AddDish, {
  onRedirecting: () => <Loading />,
});
