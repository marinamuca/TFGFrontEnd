import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl } from "@mui/material";
import {
  Exhibition,
  ExhibitionErrorData,
} from "../../../../domain/types/types";
import {
  useCreateExhibitionsMutation,
  useUpdateExhibitionMutation,
} from "../../../../domain/api/apiSlice";

interface ExhibitionForm {
  exhibition?: any;
}

const ExhibitionForm = (props: ExhibitionForm) => {
  let [sendExhibition, response] = useCreateExhibitionsMutation();
  if (props.exhibition)
    [sendExhibition, response] = useUpdateExhibitionMutation();
  const [exhibition, setExhibition] = useState<Exhibition>({
    name: props.exhibition ? props.exhibition.name : "",
    theme: props.exhibition ? props.exhibition.theme : "",
    room_width: props.exhibition ? props.exhibition.room_width : "",
    room_length: props.exhibition ? props.exhibition.room_length : "",
  });

  const [error, setError] = useState<ExhibitionErrorData>({});

  useEffect(() => {
    if (response.isError) {
      if ("data" in response.error)
        setError(response.error.data as ExhibitionErrorData);
      console.log(error);
    } else if (response.isSuccess) {
      window.location.reload();
    }
  }, [response]);

  function handleSubmit(event: any) {
    event.preventDefault();
    if (props.exhibition)
      sendExhibition({ id: props.exhibition.id, body: exhibition });
    else sendExhibition(exhibition);
  }

  return (
    <FormControl sx={{ m: 3, width: 225 }}>
      <TextField
        size="small"
        label="Nombre de la Exposición"
        sx={{ mb: 3 }}
        value={exhibition.name}
        onChange={(e) => {
          setExhibition({ ...exhibition, name: e.target.value });
        }}
        fullWidth
        error={"name" in error}
        helperText={"name" in error ? error.name : null}
      ></TextField>
      <TextField
        size="small"
        label="Temática de la Exposición"
        sx={{ mb: 3 }}
        value={exhibition.theme}
        onChange={(e) => {
          setExhibition({ ...exhibition, theme: e.target.value });
        }}
        fullWidth
        error={"theme" in error}
        helperText={"theme" in error ? error.theme : null}
      ></TextField>
      <TextField
        size="small"
        label="Ancho de la Sala 3D"
        sx={{ mb: 3 }}
        value={exhibition.room_width}
        onChange={(e) => {
          setExhibition({ ...exhibition, room_width: e.target.value });
        }}
        fullWidth
        error={"room_width" in error}
        helperText={"room_width" in error ? error.room_width : null}
      ></TextField>
      <TextField
        size="small"
        label="Largo de la Sala 3D"
        sx={{ mb: 3 }}
        value={exhibition.room_length}
        onChange={(e) => {
          setExhibition({ ...exhibition, room_length: e.target.value });
        }}
        fullWidth
        error={"room_length" in error}
        helperText={"room_length" in error ? error.room_length : null}
      ></TextField>
      <Button variant="contained" type="submit" onClick={handleSubmit}>
        Crear
      </Button>
    </FormControl>
  );
};

export default ExhibitionForm;
