import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useAppSelector, useAppDispatch } from "../../hooks/appHooks";
import { closeModal } from "../../redux/modalSlice";
import "./Modal.css";
import { useTranslation } from "react-i18next";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "0px",
  boxShadow: 24,
  borderRadius: "25px",
  p: 4,
  with: "fit-content",
};

export default function AppModal() {
  const { t } = useTranslation(["modal"]);
  const dispatch = useAppDispatch();
  const { isOpen, title, content } = useAppSelector((state) => state.modal);
  return (
    <Modal
      open={isOpen}
      onClose={() => {
        dispatch(closeModal());
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ borderRadius: "50px" }}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {t(title)}
        </Typography>
        {content}
      </Box>
    </Modal>
  );
}
