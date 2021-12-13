import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../Style/categories.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useFetch from "../API/useFetch";
import DishList from "../Components/Dish/DishList";
import Loading from "../Components/Login/Loading";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const Dish = () => {
  const url = "http://localhost:8080/api/public/products/";

  const { data: dishes, error, isPending } = useFetch(url);

  const handleDelete = (data) =>
    axios
      .delete(url + data.id)
      .then(function (response) {
        console.log(response);
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });

  return (
    <div>
      <div>
        <h1>Dishes</h1>
      </div>

      <div>
        <Button variant="contained" href="/AddDish">
          Add dish
        </Button>
      </div>

      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {dishes && <DishList onDelete={handleDelete} url={url} dishes={dishes} />}
    </div>
  );
};

export default withAuthenticationRequired(Dish, {
  onRedirecting: () => <Loading />,
});
