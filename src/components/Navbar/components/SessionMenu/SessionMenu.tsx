import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import React from "react";
import useSession from "./hooks/useSession";
import useMenu from "./hooks/useMenu";
import { useTranslation } from "react-i18next";

const SessionMenu: React.FC = () => {
  const { t, i18n } = useTranslation(["auth"]);
  const { handleLogout, token, session } = useSession();
  const {
    handleLogoutClick,
    handleMenuClose,
    anchorEl,
    handleMenuOpen,
    handleProfileClick,
    handleLoginClick,
    handleRegisterClick,
    loginPath,
    registerPath,
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
      <MenuItem onClick={handleProfileClick}>{t("profile")}</MenuItem>
      <MenuItem onClick={handleLogoutClick}>{t("logout")}</MenuItem>
    </Menu>
  );

  if (!token || !session) {
    if (loginPath)
      return (
        <Button color="inherit" onClick={handleRegisterClick}>
          {t("registerLabel")}
        </Button>
      );
    if (registerPath)
      return (
        <Button color="inherit" onClick={handleLoginClick}>
          {t("loginLabel")}
        </Button>
      );
  }

  return (
    <Box sx={{ display: "flex" }}>
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
