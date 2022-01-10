import React from "react";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Check from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import UndoButton from "./UndoButton";
import { Prompt } from "react-router";
import UploadIcon from "@mui/icons-material/Upload";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const queryParams = new URLSearchParams(window.location.search);

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function EditItemField(props) {
  const [value] = useState(props.value);
  const [canEdit] = useState(queryParams.get("edit"));
  const [item] = useState(props.item);
  const [open, setOpen] = React.useState(false);
  const [validInput, setValidInput] = useState(true);
  const [error, setError] = useState("undefined error");
  const [dbValue, setDbValue] = useState(props.value);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  const [values, setValues] = React.useState({
    weight: props.value,
  });

  function Undo(newValue) {
    setValues({ ...values, weight: newValue });
    CheckIfChanged(newValue);
  }

  function CheckIfChanged(_value) {
    if (dbValue === _value) {
      setUnsavedChanges(false);
      console.log("set to false");
    } else {
      setUnsavedChanges(true);
      console.log("set to true");
    }
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    CheckIfChanged(event.target.value); //idk why this works
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

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      UpdateQuantityById(props.id, values.weight);
    }
  };

  function UpdateQuantityById(_id, _quantity) {
    if (_quantity >= 0) {
      setValidInput(true);
    } else {
      setValidInput(false);
      setError("value can't be below zero");
    }
    item.quantity = _quantity;
    setDbValue(_quantity);
    console.log(item);

    if (_quantity > 0) {
      try {
        const token = getAccessTokenSilently();
        axios
          .get(
            "https://db01-4-imsservice.herokuapp.com/api/private/update/" + _id,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(() => {
            console.log("item" + _id + "updated");
          })
          .catch((e) => {
            setError(e);
          });
      } catch (e) {
        setValidInput(false);
        setError(e);
      } finally {
        handleSnackbarOpen();
        setUnsavedChanges(false);
      }
    } else {
      handleSnackbarOpen();
      setUnsavedChanges(true);
    }
  }

  if (canEdit === "true") {
    return (
      <div>
        <Prompt message="sure?" />
        <OutlinedInput
          type="number"
          onKeyDown={_handleKeyDown}
          value={values.weight}
          onChange={handleChange("weight")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => UpdateQuantityById(props.id, values.weight)}
              >
                {unsavedChanges ? (
                  <div>
                    <UploadIcon />
                  </div>
                ) : (
                  <div>
                    <Check color="primary" />
                  </div>
                )}
              </IconButton>
            </InputAdornment>
          }
          label="check"
        />
        {/* <h5>dbValue:{dbValue}</h5>
        <h5>inputValue:{values.weight}</h5>
        {unsavedChanges ? (
          <h5>unsaved changes?: true</h5>
        ) : (
          <h5>unsaved changes?: false</h5>
        )} */}
        <UndoButton value={values.weight} Undo={Undo} />
        {validInput ? (
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
              Quantity of {item.name} succesfully updated to {item.quantity}
            </Alert>
          </Snackbar>
        ) : (
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
              Quantity of {item.name} not updated. Error: {error}
            </Alert>
          </Snackbar>
        )}
      </div>
    );
  } else {
    return <div>{value}</div>;
  }
}
