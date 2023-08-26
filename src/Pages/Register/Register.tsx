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
import { useTranslation } from "react-i18next";
import useRegister from "./hooks/useRegister";

const Register: React.FC = () => {
  const { t } = useTranslation(["auth"]);
  const { user, handleSubmit, handleInputChange, error, profileTypes } =
    useRegister();


  return (
    <Grid container spacing={3} sx={{ mt: 3 }} justifyContent="center">
      <Grid item xs={12}>
        <Typography component="div" variant="h5" textAlign="center">
          {t("registerLabel")}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <TextField
            label={t("username")}
            sx={{ mb: 3 }}
            value={user?.username}
            onChange={(_event) => {
              handleInputChange("username", _event.target.value);
            }}
            error={"username" in error}
            helperText={"username" in error ? error.username : null}
          />
          <TextField
            label={t("email")}
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
            label={t("password")}
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
            label={t("confirmPassword")}
            sx={{ mb: 3 }}
            value={user?.password2}
            onChange={(_event) => {
              handleInputChange("password2", _event.target.value);
            }}
            type="password"
            error={"password2" in error}
            helperText={"password2" in error ? error.password2 : null}
          />

          <TextField
            label={t("accountType")}
            value={user?.is_artist}
            onChange={(_event) => {
              handleInputChange("is_artist", _event.target.value);
            }}
            select
            error={"is_artist" in error}
            helperText={
              "is_artist" in error ? (
                error.is_artist
              ) : (
                <React.Fragment>
                  <span>{t("artistHelper")}</span>
                  <br />
                  <span>{t("visitorHelper")}</span>
                </React.Fragment>
              )
            }
          >
            {Object.keys(profileTypes).map((key) => (
              <MenuItem key={key} value={key}>
                {t(profileTypes[key])}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      </Grid>
      <Grid item>
        <Button variant="contained" type="submit" onClick={handleSubmit}>
          {t("registerBtn")}
        </Button>
      </Grid>
    </Grid>
  );
};

export default React.memo(Register);
