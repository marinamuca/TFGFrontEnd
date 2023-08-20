import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl } from "@mui/material";
import {
  useCreateIllustrationMutation,
  useUpdateIllustrationMutation,
} from "../../../../domain/api/apiSlice";
import {
  IllustrationErrorData,
  IllustrationInput,
} from "../../../../domain/types/types";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { MuiFileInput } from "mui-file-input";
import { API_DATE_FORMAT } from "../../../../constants";
import useIllustrationForm from "./hooks/useIllustrationForm";

interface IllustrarionFormProps {
  id_exhibition: string;
  illustration?: any;
}

const IllustrationForm = (props: IllustrarionFormProps) => {
  const { illustration, setValue, error, handleSubmit, btnLabel } =
    useIllustrationForm(props.id_exhibition, props.illustration);

  return (
    <FormControl sx={{ m: 3 }}>
      <TextField
        size="small"
        label="Titulo de la ilustración"
        sx={{ mb: 3 }}
        value={illustration.title}
        onChange={(e) => {
          setValue("title", e.target.value);
        }}
        fullWidth
        error={"title" in error}
        helperText={"title" in error ? error.title : null}
      ></TextField>
      <TextField
        size="small"
        label="Descripción de la ilustración"
        sx={{ mb: 3 }}
        value={illustration.description}
        onChange={(e) => {
          setValue("description", e.target.value);
        }}
        fullWidth
        error={"description" in error}
        helperText={"description" in error ? error.description : null}
      ></TextField>

      <DatePicker
        disableFuture
        sx={{ mb: 3 }}
        label="Fecha de realización"
        value={illustration.date ? dayjs(illustration.date) : null}
        format="DD/MM/YYYY"
        onChange={(e: Dayjs | null) => {
          setValue("date", e!.format(API_DATE_FORMAT));
        }}
        slotProps={{
          textField: {
            error: "date_painted" in error,
            helperText: "date_painted" in error ? error.date_painted : null,
          },
        }}
      />

      <MuiFileInput
        sx={{ mb: 3 }}
        placeholder={
          props.illustration ? `Modificar imagen` : "Selecciona una imagen"
        }
        value={illustration.image}
        onChange={(image: File | null) => {
          setValue("image", image as File);
        }}
        fullWidth
        error={"image" in error}
        helperText={"image" in error ? error.image : null}
      />

      <Button variant="contained" type="submit" onClick={handleSubmit}>
        Crear
      </Button>
    </FormControl>
  );
};

export default React.memo(IllustrationForm);
