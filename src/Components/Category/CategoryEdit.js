import React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

export default function CategoryEdit(props) {
  const initialFValues = {
    name: "",
    description: null,
    image: "",
  };

  const { onClose, selectedCard, open, url, handleSuccesAlert, fetchCategories } = props;
  const [values, setValues] = useState(initialFValues);
  const categoryUrl = "http://localhost:8080";
  const { getAccessTokenSilently } = useAuth0();

  const handleClose = () => {
    onClose();
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
  })
}

  useEffect(() => {
    if (selectedCard != null)
        setValues({...selectedCard})
}, [selectedCard])

  const handleSubmit = async (e) => {
    const token = await getAccessTokenSilently();
  axios
  .put(`${categoryUrl}/api/private/categories/` + selectedCard.id, values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .catch(function () {
  })
  .finally(function () {
    handleSuccesAlert()
  });
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
        <Button onClick={handleSubmit} autoFocus>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CategoryEdit.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
