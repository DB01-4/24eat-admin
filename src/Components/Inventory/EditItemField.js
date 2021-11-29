import React from "react";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Check from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

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

  const [values, setValues] = React.useState({
    weight: props.value,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
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
    console.log(item);

    if (_quantity > 0) {
      try {
        fetch("http://localhost:8084/api/update/" + _id, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        })
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
      }
    } else {
      handleSnackbarOpen();
    }
  }

  if (canEdit === "true") {
    return (
      <div>
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
                <Check />
              </IconButton>
            </InputAdornment>
          }
          label="check"
        />
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
