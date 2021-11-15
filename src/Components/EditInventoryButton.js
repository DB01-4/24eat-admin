import * as React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import "../App.css";

export default function EditInventoryButton() {
  return (
    <div className="flex-child">
      <Button variant="outlined" startIcon={<EditIcon />}>
        Edit Items
      </Button>
    </div>
  );
}
