import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importing translation files
import commonES from "./locales/es/common.json";
import authES from "./locales/es/auth.json";
import commonEN from "./locales/en/common.json";
import authEN from "./locales/en/auth.json";
import modelsEN from "./locales/en/models.json";
import modelsES from "./locales/es/models.json";
import modalES from "./locales/es/modal.json";
import modalEN from "./locales/en/modal.json";
import notificationsES from "./locales/es/notifications.json";
import notificationsEN from "./locales/en/notifications.json";


//Creating object with the variables of imported translation files
const resources = {
  en: {
    common: commonEN,
    auth: authEN,
    models: modelsEN,
    modal: modalEN,
    notifications: notificationsEN
  },
  es: {
    common: commonES,
    auth: authES,
    models: modelsES,
    modal: modalES,
    notifications: notificationsES
  },
};

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