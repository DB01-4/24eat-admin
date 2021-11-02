import React from "react";
import { useEffect, useState} from "react";
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import axios from "axios";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


export default function CategoryEdit(props) {

  const initialFValues = {
    name: '',
    description: '',
    image: ''
}

  const { onClose, selectedCard, open, url} = props;
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [value, setValue] = useState(initialFValues);

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (selectedCard != null)
        setValue({...selectedCard})
        console.log(value)
}, [selectedCard])

  const onSubmit = data => 
  axios.put(url+selectedCard.id, data)
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
          <TextField
           id="outlined-multiline-flexible"
           label="Multiline"
           multiline
           maxRows={4}
           value={value.name}
           {...register("name", { required: true })} 
          />
            {errors.exampleRequired && <p>This field is required</p>}

            <TextField
           id="outlined-multiline-flexible"
           label="Multiline"
           multiline
           maxRows={4}
           value={value.description}
           {...register("description", { required: true })} 
          />
            {errors.exampleRequired && <p>This field is required</p>}

            <TextField
           id="outlined-multiline-flexible"
           label="Multiline"
           multiline
           maxRows={4}
           value={value.description}
           {...register("image", { required: true })} 
          />
            {errors.exampleRequired && <p>This field is required</p>}
        </form>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSubmit(onSubmit)} autoFocus>Submit</Button>
          <Button onClick={() => console.log('aids')}>Get aids in console</Button>
        </DialogActions>
    </Dialog>
  );
}

CategoryEdit.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};