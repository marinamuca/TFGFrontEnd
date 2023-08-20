import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import React from "react";
import useInfoToast from "./hooks/useInfoToast";

const InfoToast = () => {
  const {toast, handleClose} = useInfoToast();

  return (
    <Snackbar
      open={toast.isOpen}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MuiAlert severity={toast.severity} variant="filled" onClose={handleClose}>
        {toast.label}
      </MuiAlert>
    </Snackbar>
  );
};

export default InfoToast;
