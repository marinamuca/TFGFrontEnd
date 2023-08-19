import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import useRegister from "./hooks/useRegister";

const Register: React.FC = () => {
  const {
    user,
    handleSubmit,
    handleInputChange,
    error,
    profileTypes,
    profileTypeHelper,
  } = useRegister();

  return (
    <Grid container spacing={3} sx={{ mt: 3 }} justifyContent="center">
      <Grid item xs={12}>
        <Typography component="div" variant="h5" textAlign="center">
          Regístrate
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <TextField
            label="Nombre de usuario"
            sx={{ mb: 3 }}
            value={user?.username}
            onChange={(_event) => {
              handleInputChange("username", _event.target.value);
            }}
            error={"username" in error}
            helperText={"username" in error ? error.username : null}
          />
          <TextField
            label="Email"
            sx={{ mb: 3 }}
            value={user?.email}
            onChange={(_event) => {
              handleInputChange("email", _event.target.value);
            }}
            type="email"
            error={"email" in error}
            helperText={"email" in error ? error.email : null}
          />
          <TextField
            label="Contraseña"
            sx={{ mb: 3 }}
            value={user?.password1}
            onChange={(_event) => {
              handleInputChange("password1", _event.target.value);
            }}
            type="password"
            error={"password1" in error}
            helperText={"password1" in error ? error.password1 : null}
          />
          <TextField
            label="Confirmar Contraseña"
            sx={{ mb: 3 }}
            value={user?.password2}
            onChange={(_event) => {
              handleInputChange("password2", _event.target.value);
            }}
            type="password"
            error={"password2" in error}
            helperText={"password2" in error ? error.password2 : null}
          />
          <Tooltip
            title={
              <React.Fragment>
                <p>{profileTypeHelper.ARTIST}</p>
                <p>{profileTypeHelper.VISITOR}</p>
              </React.Fragment>
            }
            arrow
            placement="right"
          >
            <TextField
              label="Tipo de Cuenta"
              value={user?.profile_type}
              onChange={(_event) => {
                handleInputChange("profile_type", _event.target.value);
              }}
              select
              error={"profile_type" in error}
              helperText={"profile_type" in error ? error.profile_type : ""}
            >
              {Object.keys(profileTypes).map((key) => (
                <MenuItem key={key} value={key}>
                  {profileTypes[key]}
                </MenuItem>
              ))}
            </TextField>
          </Tooltip>
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          type="submit"
          onClick={handleSubmit}
          fullWidth
        >
          Crear Cuenta
        </Button>
      </Grid>
    </Grid>
  );
};

export default React.memo(Register);
