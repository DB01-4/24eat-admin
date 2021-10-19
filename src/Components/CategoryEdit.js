import React from "react";
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import axios from "axios";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


export default function CategoryEdit(props) {

  const { onClose, selectedCard, open } = props;
  const { register, handleSubmit, formState: { errors } } = useForm();


  const handleClose = () => {
    onClose();
  };

  const onSubmit = data => 
  axios.put(`http://localhost:8080/categories/${selectedCard.id}`, data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
  });

  return (
    <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Edit</DialogTitle>
        <form>
            <input defaultValue={(typeof selectedCard !== 'undefined')? selectedCard.name:null} {...register("name", { required: true })} />
            {errors.exampleRequired && <p>This field is required</p>}

            <input defaultValue={(typeof selectedCard !== 'undefined')? selectedCard.description:null} {...register("description", { required: true })} />
            {errors.exampleRequired && <p>This field is required</p>}

            <input defaultValue={(typeof selectedCard !== 'undefined')? selectedCard.image:null} {...register("image", { required: true })} />
            {errors.exampleRequired && <p>This field is required</p>}
        </form>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSubmit(onSubmit)} autoFocus>Submit</Button>
        </DialogActions>
    </Dialog>
  );
}

CategoryEdit.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};