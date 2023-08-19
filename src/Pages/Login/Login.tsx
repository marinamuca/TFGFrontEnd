import { Button, FormControl, TextField } from "@mui/material";
import React from "react";
import useLogin from "./hooks/useLogin";

const Login: React.FC = () => {
  const { user, handleSubmit, handleInputChange, error } = useLogin();

  return (
    <FormControl sx={{ m: 3 }} fullWidth>
      <TextField
        label="Nombre de usuario"
        sx={{ mb: 3 }}
        value={user?.username || ''}
        onChange={(_event) => {handleInputChange('username', _event.target.value)}}
        error={"username" in error}
        helperText={"username" in error ? error.username : null}
        />
      <TextField
        label="Contraseña"
        sx={{ mb: 3 }}
        value={user?.password || ''}
        onChange={(_event) => {handleInputChange('password', _event.target.value)}}
        type="password"
        error={"password" in error}
        helperText={"password" in error ? error.password : null}
      />
      <Button variant="contained" type="submit" onClick={handleSubmit}>
        Iniciar Sesion
      </Button>
    </FormControl>
  );
};

export default Login;
