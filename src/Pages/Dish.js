import React from "react";
import { useEffect, useState, forwardRef} from "react";
import axios from "axios";
import "../Style/categories.css";
import Button from "@mui/material/Button";
import useFetch from "../API/useFetch";
import DishList from "../Components/Dish/DishList";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Dish(){

  const url  = "http://localhost:8080/products/"

  const { data: dishes, error, isPending } = useFetch(url);
  const [open, setOpen] = useState(false);
  const [dishess, setDishes] = useState(null);

  useEffect(() => {
    fetchDishes()
    }, [])
  
    const fetchDishes = () =>
    axios.get(url)
    .then( function (response) {
      console.log(response)
      setDishes(response.data)
    })
    .catch(function (error){
      console.log(error)
    });
  
  const handleDelete = data => 
  axios.delete(url+data.id)
    .then(function (response) {
      console.log(response);
      fetchDishes()
    })
    .catch(function (error) {
      console.log(error);
  })
  .finally(function () {
    handleSuccesAlert()
  });

  const handleSuccesAlert = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

      return (
          <div>
              <div>
                  <h1>Dishes</h1>
              </div>

              <div>
                  <Button variant="contained" href="/AddDish">Add dish</Button>
              </div>

              { error && <div>{ error }</div> }
              { isPending && <div>Loading...</div> }

              { dishes && <DishList 
              fetchDishes={fetchDishes}  
              handleSuccesAlert={handleSuccesAlert}  
              onDelete={handleDelete} 
              url={url}
              dishes={dishess} /> }

              <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                  Action performed successfully 
                </Alert>
              </Snackbar>
          </div>
      )
}