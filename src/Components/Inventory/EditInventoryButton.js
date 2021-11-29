import * as React from "react";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
const queryParams = new URLSearchParams(window.location.search);

export default function EditInventoryButton() {
  const [canEdit] = useState(queryParams.get("edit"));

  if (canEdit === "true") {
    return (
      <div className="flex-child">
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          href="http://localhost:3000/Inventory"
        >
          Cancel
        </Button>
      </div>
    );
  } else {
    return (
      <div className="flex-child">
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          href="http://localhost:3000/Inventory/?edit=true"
        >
          Edit Items
        </Button>
      </div>
    );
  }
}
