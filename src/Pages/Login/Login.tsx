import { Button, FormControl, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import useLogin from "./hooks/useLogin";

const Login: React.FC = () => {
  const { user, handleSubmit, handleInputChange, error } = useLogin();

  return (
    <Grid container spacing={3} sx={{ mt: 3 }} justifyContent="center">
      <Grid item xs={12}>
      <Typography component="div" variant="h5" textAlign="center">
          Inicia Sesión
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <TextField
            label="Nombre de usuario"
            sx={{ mb: 3 }}
            value={user?.username || ""}
            onChange={(_event) => {
              handleInputChange("username", _event.target.value);
            }}
            error={"username" in error}
            helperText={"username" in error ? error.username : null}
          />
          <TextField
            label="Contraseña"
            value={user?.password || ""}
            onChange={(_event) => {
              handleInputChange("password", _event.target.value);
            }}
            type="password"
            error={"password" in error}
            helperText={"password" in error ? error.password : null}
          />
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <Button variant="contained" type="submit" onClick={handleSubmit} fullWidth>
          Iniciar Sesion
        </Button>
      </Grid>
    </Grid>
  );
};

export default React.memo(Login);
