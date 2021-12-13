import React from "react";
import {useEffect, useState, forwardRef }from "react";
import axios from "axios";
import "../Style/categories.css";
import CategoryList from "../Components/Category/CategoryList";
import {Button, Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';


const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function Category(){

  const url  = "http://localhost:8080/categories/"

  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
  fetchCategories()
  }, [])

  const fetchCategories = () =>
  axios.get(url)
  .then( function (response) {
    setCategories(response.data)
  })
  .catch(function (error){
  });

  
  const handleDelete = data => 
  axios.delete(url+data.id)
    .then(function () {
      fetchCategories()
    })
    .catch(function () {
  })
  .finally(function (){
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
                  <h1>Categories</h1>
              </div>
              <div>
                  <Button variant="contained" href="/AddCategory">Add category</Button>
              </div>

              { categories && <CategoryList 
              fetchCategories={fetchCategories} 
              handleSuccesAlert={handleSuccesAlert} 
              onDelete={handleDelete} 
              url={url} 
              categories={categories} /> }

              <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                  Action performed successfully 
                </Alert>
              </Snackbar>
          </div>
      )
}