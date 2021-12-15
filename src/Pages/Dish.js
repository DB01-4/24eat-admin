import React from "react";
import { useEffect, useState, forwardRef} from "react";
import axios from "axios";
import "../Style/categories.css";
import { Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import DishList from "../Components/Dish/DishList";
import Loading from "../Components/Login/Loading";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Dish = () => {
  const url = "https://db01-4-menuservice.herokuapp.com/";

  const [open, setOpen] = useState(false);
  const [dishes, setDishes] = useState(null);

  useEffect(() => {
    fetchDishes()
    }, [])
  
    const fetchDishes = () =>
    axios.get(url)
    .then( function (response) {
      setDishes(response.data)
    })
    .catch(function (){
    });
  
  const handleDelete = data => 
  axios.delete(url+data.id)
    .then(function (response) {
      fetchDishes()
    })
    .catch(function () {
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

              { dishes && <DishList 
              fetchDishes={fetchDishes}  
              handleSuccesAlert={handleSuccesAlert}  
              onDelete={handleDelete} 
              url={url}
              dishes={dishes} /> }

              <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                  Action performed successfully 
                </Alert>
              </Snackbar>
          </div>
  );
};
export default withAuthenticationRequired(Dish, {
  onRedirecting: () => <Loading />,
});