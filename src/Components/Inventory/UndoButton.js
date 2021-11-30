import React from "react";
import UndoIcon from "@mui/icons-material/UndoRounded";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function UndoButton({ Undo, value }) {
  const [originalValue, SetOriginalValue] = useState(value);
  const [newValue, SetNewValue] = useState(value);
  React.useEffect(() => {
    console.log("undo updated");
    SetNewValue(value);
  });

  return (
    <div>
      {newValue == originalValue ? (
        <div></div>
      ) : (
        <div>
          <IconButton aria-label="delete" onClick={() => Undo(originalValue)}>
            <UndoIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
}
