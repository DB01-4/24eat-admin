import React from "react";
import { useState } from "react";
import axios from "axios";
import "../Style/addCrud.css";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
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
  const [error, setError] = useState("undefined error");
  const [errorTrigger, setErrorTrigger] = useState(false);
  const [open, setOpen] = React.useState(false);

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
    console.log(e);
    axios
      .post(`${categoryUrl}api/private/categories`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function () {
        history.push("/Category");
      })
      .catch(function (error) {
        setErrorTrigger(true);
        setError(error.message);
        console.log(error.message);
        console.log(values);
      })
      .finally(function (){
        handleSnackbarOpen();
      });
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
}
