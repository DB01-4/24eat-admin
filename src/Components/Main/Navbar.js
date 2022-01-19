import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LoginButton from "../Login/LoginButton";
import LogoutButton from "../Login/LogoutButton";

export default function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MenuIcon />
            </IconButton>
            <div>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>
                  <a href="/category">Category</a>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <a href="/dish">Dish</a>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <a href="/inventory">Inventory</a>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <a href="/bills">Bills</a>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <a href="/kitchen">Kitchen</a>
                </MenuItem>
              </Menu>
            </div>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin panel
          </Typography>
          <LoginButton />
          <LogoutButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
