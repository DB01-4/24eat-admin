import React, { useEffect, useState, forwardRef } from "react";
import axios from "axios";
import "../Style/categories.css";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../Components/Login/Loading";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import CategoryList from "../Components/Category/CategoryList";
import { Button, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Category = () => {

  const serverUrl = "https://db01-4-menuservice.herokuapp.com";
  const url= "https://db01-4-menuservice.herokuapp.com"
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState(null);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    fetchCategories();
  });

  const fetchCategories = async () => {
    const token = await getAccessTokenSilently();
    axios
      .get(`${serverUrl}/api/private/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setCategories(response.data);
      })
      .catch(function (error) {});
  };

  const handleSuccesAlert = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <div>
        <h1>Categories</h1>
      </div>
      <div>
        <Button variant="contained" href="/AddCategory">
          Add category
        </Button>
      </div>

      {categories && (
        <CategoryList
          fetchCategories={fetchCategories}
          handleSuccesAlert={handleSuccesAlert}
          url={url}
          categories={categories}
        />
      )}

      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Action performed successfully
        </Alert>
      </Snackbar>
    </div>
  );
};

export default withAuthenticationRequired(Category, {
  onRedirecting: () => <Loading />,
});
