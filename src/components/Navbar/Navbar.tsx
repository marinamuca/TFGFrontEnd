// import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { Link } from "@mui/material";
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
        </Toolbar>
      </AppBar>
    </>
  );
};

export default React.memo(Navbar);
