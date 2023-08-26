import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import React from "react";
import useInfoToast from "./hooks/useInfoToast";
import { useTranslation } from "react-i18next";

const InfoToast = () => {
  const {t} = useTranslation(['notifications']);
  const {toast, handleClose} = useInfoToast();

  return (
    <Snackbar
      open={toast.isOpen}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MuiAlert severity={toast.severity} variant="filled" onClose={handleClose}>
        {t(toast.label)}
      </MuiAlert>
    </Snackbar>
  );
};

export default InfoToast;
