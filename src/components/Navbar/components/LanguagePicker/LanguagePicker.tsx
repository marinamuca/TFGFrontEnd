import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TranslateIcon from "@mui/icons-material/Translate";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useState } from "react";
import useLanguagePicker from "./hooks/useLanguagePicker";

const LanguagePicker: React.FC = () => {
  const { t } = useTranslation(["common"]);
  const {
    anchorEl,
    handleMenuOpen,
    languageList,
    handleLanguageClick,
    handleMenuClose,
  } = useLanguagePicker();

  const languageMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      {languageList.map((item) => {
        return (
          <MenuItem key={item} onClick={() => handleLanguageClick(item)}>
            {t(item)}
          </MenuItem>
        );
      })}
    </Menu>
  );

  return (
    <Box sx={{ display: "flex", mr: 2 }}>
      <Button
        onClick={handleMenuOpen}
        color="inherit"
        startIcon={<TranslateIcon />}
        endIcon={Boolean(anchorEl) ? <ExpandLessIcon /> : <ExpandMoreIcon />} //TODO: Change to more or less depending on open value
      >
        {t("chooseLanguage")}
      </Button>
      {languageMenu}
    </Box>
  );
};

export default LanguagePicker;
