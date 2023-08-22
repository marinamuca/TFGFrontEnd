import React, { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LOGIN_PATH, PROFILE_PATH, REGISTER_PATH } from "../../../../constants";

const useMenu = (handleLogout: () => void) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

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

  const loginPath = useMemo( () => (location.pathname.includes(LOGIN_PATH)),[location])
  const registerPath = useMemo( () => (location.pathname.includes(REGISTER_PATH)),[location])

  return {
    handleMenuClose,
    handleLogoutClick,
    handleMenuOpen,
    anchorEl,
    handleProfileClick,
    handleLoginClick,
    handleRegisterClick,
    loginPath, 
    registerPath
  };
};
export default useMenu;
