import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

const DeleteItemButton = ({ id }) => {
  return (
    <div>
      <IconButton aria-label="delete">
        <DeleteIcon onClick={sayHello} />
      </IconButton>
    </div>
  );
};

function sayHello() {
  alert("Hello!");
}

export default DeleteItemButton;
