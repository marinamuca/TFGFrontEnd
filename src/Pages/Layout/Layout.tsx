import { Box, Container } from "@mui/material";
import React from "react"
import { useLocation } from "react-router-dom";
import AppModal from "../../components/Modal";
import Navbar from "../../components/Navbar";
import { ROOM_PATH } from "../../constants"

interface Props {
    children: React.ReactElement;
}

const Layout: React.FC<Props> = ({ children }) => {
  const location = useLocation();

  if (location.pathname.includes(ROOM_PATH))
    return (
      <div className="App">
        <AppModal />
        <Navbar />
        {children}
      </div>
    );

  return (
    <div className="App">
      <AppModal />
      <Navbar />
      <Container fixed maxWidth="md">
        <Box sx={{ m: 1 }}>{children}</Box>
      </Container>
    </div>
  );
};

export default Layout;