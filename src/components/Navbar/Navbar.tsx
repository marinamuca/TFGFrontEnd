// import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { MdAccountCircle } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import React from "react";
import { useLogoutMutation } from "../../domain/api/apiSlice";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LOGIN_PATH } from "../../constants";

export const APP_BAR_HEIGHT = 65;

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const isMenuOpen = Boolean(anchorEl);

  const [logout, response] = useLogoutMutation();

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout(null);
    setAnchorEl(null);
    navigate(LOGIN_PATH);
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log(window.location);
    // window.location.replace("/profile")
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileClick}>Perfil</MenuItem>
      <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="sticky">
        <Toolbar style={{ height: APP_BAR_HEIGHT }}>
          <Link href="/" underline="none" color="white">
            <Typography variant="h6" noWrap component="div">
              Live Art
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex" }}>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </>
  );
};

export default React.memo(Navbar);
