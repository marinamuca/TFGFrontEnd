import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Languages } from "../../../../../constants";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/appHooks";
import { selectLanguage, setLanguage } from "../../../../../redux/i18nSlice";

const useLanguagePicker = () => {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const language = useAppSelector(selectLanguage);

  const languageList = [Languages.SPANISH, Languages.ENGLISH];

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageClick = (lang: string) => {
    dispatch(setLanguage(lang));
    setAnchorEl(null);
  };

  useEffect(() => {
    i18n.changeLanguage(language);
    // location.reload();
  }, [language]);

  return {
    anchorEl,
    handleMenuOpen,
    languageList,
    handleLanguageClick,
    handleMenuClose,
  };
};

export default useLanguagePicker;
