import * as React from "react";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const queryParams = new URLSearchParams(window.location.search);

export default function EditInventoryButton(props) {
  const [canEdit] = useState(queryParams.get("edit"));
  const [link, setLink] = useState("http://localhost:3000/Inventory");
  const [confirmation, setConfirmation] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (canEdit === "true") {
    return (
      <div className="flex-child">
        {props.unsavedChanges ? (
          <div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Leave with unsaved changes?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to leave?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                  href="http://localhost:3000/Inventory"
                  variant="outlined"
                  color="error"
                  autoFocus
                >
                  Discard Changes
                </Button>
              </DialogActions>
            </Dialog>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => {
                handleClickOpen();
              }}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              href="http://localhost:3000/Inventory"
            >
              Cancel
            </Button>
          </div>
        )}
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
