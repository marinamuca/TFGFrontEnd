import i18n from "i18next";
import { initReactI18next } from "react-i18next";


// Importing translation files
import commonES from "./locales/es/common.json";
import authES from "./locales/es/auth.json";
import commonEN from "./locales/en/common.json";
import authEN from "./locales/en/auth.json";
import exhibitionEN from "./locales/en/exhibition.json";
import exhibitionES from "./locales/es/exhibition.json";
import modalES from "./locales/es/modal.json";
import modalEN from "./locales/en/modal.json";
import notificationsES from "./locales/es/notifications.json";
import notificationsEN from "./locales/en/notifications.json";


//Creating object with the variables of imported translation files
const resources = {
  en: {
    common: commonEN,
    auth: authEN,
    exhibition: exhibitionEN,
    modal: modalEN,
    notifications: notificationsEN
  },
  es: {
    common: commonES,
    auth: authES,
    exhibition: exhibitionES,
    modal: modalES,
    notifications: notificationsES
  },
};

//i18N Initialization

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng:"en", //default language
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;