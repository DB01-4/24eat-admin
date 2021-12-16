import React from "react";
import UndoIcon from "@mui/icons-material/UndoRounded";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";

export default function UndoButton({ Undo, value }) {
  const [originalValue] = useState(value);
  const [newValue, SetNewValue] = useState(value);
  React.useEffect(() => {
    SetNewValue(value);
  },[value]);

  return (
    <div>
      {newValue === originalValue ? (
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
