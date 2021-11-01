import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import axios from "axios";

const DeleteItemButton = (props) => {
  return (
    <div>
      <IconButton aria-label="delete">
        <DeleteIcon onClick={() => sayHello(props.id)} />
      </IconButton>
    </div>
  );
};

function sayHello(id) {
  alert("deleting item with id: " + id);
}

function DeleteItem(data) {
  axios
    .post("http://localhost:8084/api/post", data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
      console.log(data);
    });
}

export default DeleteItemButton;
