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
import React, { useEffect } from "react";
import { Link } from "@mui/material";
import useSession from "./components/hooks/useSession";
import useMenu from "./components/hooks/useNavbar";
import SessionMenu from "./components/SessionMenu/SessionMenu";

export const APP_BAR_HEIGHT = 65;

const Navbar = () => {
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
          <SessionMenu />
          {/* <Button variant="filled">Login</Button>
          <Button variant="filled">Register</Button> */}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default React.memo(Navbar);
