import React from "react";
import { useEffect, useState} from "react";
import CategorieEdit from "../Style/categorieEdit.css";
import PropTypes from 'prop-types';
import axios from "axios";
import {Dialog, DialogActions, DialogTitle, Button, TextField} from '@mui/material';


export default function CategoryEdit(props) {

  const initialFValues = {
    name: '',
    description: null,
    image: ''
}

  const { onClose, selectedCard, open, url} = props;
  const [values, setValues] = useState(initialFValues);

  const handleClose = () => {
    onClose();
  };

  const onChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
  })
    console.log(values)
}

  useEffect(() => {
    console.log("test")
    if (selectedCard != null)
        setValues({...selectedCard})
}, [selectedCard])

  const handleSubmit = e => {
  axios.put(url+selectedCard.id, values)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
     console.log(error);
  });
  window.location.reload(false);
  handleClose();
}


  return (
    <Dialog onClose={handleClose} open={open}>
        <DialogTitle className="editheader">Edit</DialogTitle>
        <form className="form">
          <div className="textfield">
          <TextField
           id="outlined-multiline-flexible"
           label="name"
           name="name"
           multiline
           maxRows={4}
           defaultValue={values.name}
           onChange={onChange}
          />
          </div>


          <div className="textfield">
            <TextField
           id="outlined-multiline-flexible"
           label="description"
           name="description"
           multiline
           maxRows={4}
           defaultValue={values.description}
           onChange={onChange}
          />
          </div>



          <div className="textfield">
            <TextField
           id="outlined-multiline-flexible"
           label="image"
           name="image"
           multiline
           maxRows={4}
           defaultValue={values.description}
           onChange={onChange}
          />
          </div>


        </form>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSubmit} autoFocus>Submit</Button>
        </DialogActions>
    </Dialog>
  );
}

CategoryEdit.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};