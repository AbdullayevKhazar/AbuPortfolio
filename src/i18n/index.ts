import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import az from "./locales/az.json";
import en from "./locales/en.json";

i18n.use(initReactI18next).init({
  resources: {
    az: { translation: az },
    en: { translation: en },
  },
  lng: localStorage.getItem("language") || "az",
  supportedLngs: ["az", "en"],
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (language) => {
  document.documentElement.lang = language;
});

document.documentElement.lang = i18n.resolvedLanguage || i18n.language;

export default i18n;
