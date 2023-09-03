import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl } from "@mui/material";
import useExhibitionForm from "./hooks/useExhibitionForm";
import { useTranslation } from "react-i18next";

interface ExhibitionForm {
  exhibition?: any;
}

const ExhibitionForm = (props: ExhibitionForm) => {
  const { t } = useTranslation(["models"]);
  const { exhibition, setValue, error, handleSubmit, btnLabel } =
    useExhibitionForm(props.exhibition);

  return (
    <FormControl sx={{ m: 3, width: 225 }}>
      <TextField
        size="small"
        label={t("exhibitionName")}
        sx={{ mb: 3 }}
        value={exhibition.name}
        onChange={(e) => {
          setValue("name", e.target.value);
        }}
        fullWidth
        error={"name" in error}
        helperText={"name" in error ? error.name : null}
      ></TextField>
      <TextField
        size="small"
        label={t("exhibitionTheme")}
        sx={{ mb: 3 }}
        value={exhibition.theme}
        onChange={(e) => {
          setValue("theme", e.target.value);
        }}
        fullWidth
        error={"theme" in error}
        helperText={"theme" in error ? error.theme : null}
      ></TextField>
      <TextField
        size="small"
        label={t("roomWidth")}
        sx={{ mb: 3 }}
        value={exhibition.room_width}
        onChange={(e) => {
          setValue("room_width", e.target.value);
        }}
        fullWidth
        error={"room_width" in error}
        helperText={"room_width" in error ? error.room_width : null}
      ></TextField>
      <TextField
        size="small"
        label={t("roomHeight")}
        sx={{ mb: 3 }}
        value={exhibition.room_length}
        onChange={(e) => {
          setValue("room_length", e.target.value);
        }}
        fullWidth
        error={"room_length" in error}
        helperText={"room_length" in error ? error.room_length : null}
      ></TextField>
      <Button variant="contained" type="submit" onClick={handleSubmit}>
        {btnLabel}
      </Button>
    </FormControl>
  );
};

export default React.memo(ExhibitionForm);
