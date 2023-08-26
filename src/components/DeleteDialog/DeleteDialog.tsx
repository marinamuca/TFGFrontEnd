import React from "react";
import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

interface DeleteDialogProps {
  handleCancelClick: Function;
  handleDeleteClick: Function;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  handleCancelClick,
  handleDeleteClick,
}) => {
  const {t} = useTranslation(["common"]);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        mt: 2,
      }}
    >
      <Button
        variant="contained"
        sx={{ mr: 1, ml: 1 }}
        onClick={() => {
          handleCancelClick();
        }}
      >
        {t("cancel")}
      </Button>
      <Button
        variant="contained"
        color="error"
        sx={{ mr: 1, ml: 1 }}
        onClick={() => {
          handleDeleteClick();
        }}
      >
        {t('delete')}
      </Button>
    </Box>
  );
};

export default React.memo(DeleteDialog);
