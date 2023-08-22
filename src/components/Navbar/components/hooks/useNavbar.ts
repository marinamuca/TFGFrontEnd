import React from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_PATH, PROFILE_PATH, REGISTER_PATH } from "../../../../constants";

const useMenu = (handleLogout: () => void) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleMenuClose();
    handleLogout();
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClick = () => {
    setAnchorEl(null);
    navigate(PROFILE_PATH);
  };

  const handleLoginClick = () => {
    navigate(LOGIN_PATH)
  }

  const handleRegisterClick = () => {
    navigate(REGISTER_PATH)
  }

  return {
    handleMenuClose,
    handleLogoutClick,
    handleMenuOpen,
    anchorEl,
    handleProfileClick,
    handleLoginClick,
    handleRegisterClick,
  };
};
export default useMenu;
