import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "../Style/addCrud.css";
import {
  Button,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import Loading from "../Components/Login/Loading";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";

const AddDish = () => {
  let history = useHistory();

  const baseUrl = "https://db01-4-menuservice.herokuapp.com";

  const initialFValues = {
    name: "",
    description: null,
    allergies: "",
    nutrition: "",
    price: 0,
    category: { id: null, name: "", description: "", image: "" },
    image: "",
  };

  const [values, setValues] = useState(initialFValues);
  const [categories, setCategories] = useState(null);
  const { getAccessTokenSilently } = useAuth0();
  const [error, setError] = useState("undefined error");
  const [errorTrigger, setErrorTrigger] = useState(false);
  const [open, setOpen] = React.useState(false);

  const getCategoryIndex = (id, categories) => {
    console.log("id: " + id + " categories: " + categories);
    if (categories == null) {
      return "";
    }
    if (id === null) {
      console.log("id = null");
      return "";
    }
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].id === id) {
        console.log("return category");
        return categories[i];
      }
    }
  };

  useEffect(() => {
    if (categories === null) {
      fetchcat();
    }
  });

  const fetchcat = async () => {
    const token = await getAccessTokenSilently();
    axios
      .get(`${baseUrl}/api/public/categories`, {
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

  const handleSnackbarOpen = () => {
    setOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    setErrorTrigger(false);
    const token = await getAccessTokenSilently();
    axios
      .post(`${baseUrl}/api/private/products`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (error) {
        history.push("/Dish");
        setErrorTrigger(true);
        setError(error.message);
        console.log(error.message);
        console.log(values);
      })
      .catch(function (error) {
        setErrorTrigger(true);
        setError(error.message);
        console.log(error.message);
        console.log(values);
      })
      .finally(function () {
        handleSnackbarOpen();
      });
  };

  return (
    <div>
      <h1>Dishes</h1>
      <form onSubmit={handleSubmit}>
        <div className="txtfield">
          <TextField
            required
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
            label="Nutrition"
            name="nutrition"
            multiline
            maxRows={4}
            onChange={onChange}
          />
        </div>

        <div className="txtfield">
          <TextField
            required
            id="outlined-multiline-flexible"
            label="Price"
            name="price"
            type="Number"
            maxRows={1}
            onChange={onChange}
          />
        </div>

        <div className="txtfield">
          <InputLabel>Category*</InputLabel>
          <Select
            required
            name="category"
            onChange={onChange}
            value={
              categories && getCategoryIndex(values.category.id, categories)
            }
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
        <div className="btn">
          <Button type="submit" autoFocus>
            Submit
          </Button>
        </div>
      </form>

      {errorTrigger ? (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            Error: {error}
          </Alert>
        </Snackbar>
      ) : (
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            succes
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default withAuthenticationRequired(AddDish, {
  onRedirecting: () => <Loading />,
});
