import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React from "react";
import useSession from "../hooks/useSession";
import useMenu from "../hooks/useNavbar";
import { LOGIN_PATH, REGISTER_PATH } from "../../../../constants";

const SessionMenu: React.FC = () => {
  const { handleLogout, token, session } = useSession();
  const {
    handleLogoutClick,
    handleMenuClose,
    anchorEl,
    handleMenuOpen,
    handleProfileClick,
    handleLoginClick, handleRegisterClick
  } = useMenu(handleLogout);

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileClick}>Perfil</MenuItem>
      <MenuItem onClick={handleLogoutClick}>Cerrar Sesión</MenuItem>
    </Menu>
  );

  if (!token || !session)
    return (
      <>
        <Button variant="filled" color="secondary" onClick={handleLoginClick} sx={{mr: 2}}>Login</Button>
        <Button variant="filled" color="secondary"  onClick={handleRegisterClick}>Register</Button>
      </>
    );

  return (
    <Box sx={{ display: "flex" }}>
      <IconButton size="large" color="inherit">
        <Badge badgeContent={17} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <IconButton
        size="large"
        edge="end"
        onClick={handleMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      {renderMenu}
    </Box>
  );
};
export default React.memo(SessionMenu);
