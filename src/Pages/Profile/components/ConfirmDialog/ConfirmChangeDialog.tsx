import { Box, Button, Typography } from "@mui/material";
import React from "react";

interface ConfirmDialogProps {
  handleCancelClick: Function;
  handleConfirmClick: Function;
  isArtist: boolean;
}

const ConfirmChangeDialog: React.FC<ConfirmDialogProps> = ({
  handleCancelClick,
  handleConfirmClick,
  isArtist,
}) => {
  return (
    <>
      <Typography component="div" variant="subtitle1" textAlign="center">
        {isArtist
          ? "Esta acción borrará todas las exposiciones e ilustraciones que haya creado. "
          : ""}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
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
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="error"
          sx={{ mr: 1, ml: 1 }}
          onClick={() => {
            handleConfirmClick();
          }}
        >
          Cambiar
        </Button>
      </Box>
    </>
  );
};

export default React.memo(ConfirmChangeDialog);
