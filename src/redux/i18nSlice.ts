import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { RootState } from "../store";

interface i18nState {
  language: string;
}

const initialState: i18nState = {
  language: Cookies.get("language") || "es",
};

const i18nSlice = createSlice({
  name: "i18n",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      Cookies.set("language", state.language);
    },
  },
});

export const { setLanguage } = i18nSlice.actions;

export const selectLanguage = (state: RootState) => state.i18n.language;
export default i18nSlice;
