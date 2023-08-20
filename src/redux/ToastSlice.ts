import { AlertColor } from "@mui/material";
import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { EMPTY } from "../constants";
import { login, logout, register } from "../domain/api/apiSlice";
import { LoginErrorData, RegisterErrorData } from "../domain/types/types";
import type { RootState } from "../store";

interface ToastState {
  isOpen: boolean;
  label: string;
  severity?: AlertColor;
}

const initialState: ToastState = {
  isOpen: false,
  label: EMPTY,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setIsOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isOpen = payload;
    },
    setToastInfo: (state, { payload }: PayloadAction<ToastState>) => {
      state.label = payload.label;
      state.isOpen = payload.isOpen;
      state.severity = payload.severity;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(login.matchFulfilled, (state) => {
      state.severity = "success";
      state.label = "Sesión iniciada con éxito";
      state.isOpen = true;
    });
    builder.addMatcher(login.matchRejected, (state, { payload }) => {
      if (payload && "data" in payload) {
        const errorData = payload.data as LoginErrorData;
        if ("non_field_errors" in errorData) {
          state.severity = "error";
          state.label = errorData.non_field_errors!;
          state.isOpen = true;
        }
      }
    });
    builder.addMatcher(register.matchFulfilled, (state) => {
      state.severity = "success";
      state.label = "Cuenta creada con éxito";
      state.isOpen = true;
    });
    builder.addMatcher(register.matchRejected, (state, { payload }) => {
      if (payload && "data" in payload) {
        const errorData = payload.data as RegisterErrorData;
        if ("non_field_errors" in errorData) {
          state.severity = "error";
          state.label = errorData.non_field_errors!;
          state.isOpen = true;
        }
      }
    });
    builder.addMatcher(logout.matchFulfilled, (state) => {
      state.severity = "success";
      state.label = "Sesión cerrada con éxito";
      state.isOpen = true;
    });
    builder.addMatcher(logout.matchRejected, (state) => {
      state.severity = "error";
      state.label = "Error al cerrar sesión";
      state.isOpen = true;
    });
  },
});

export const { setToastInfo, setIsOpen } = toastSlice.actions;
export const selectIsOpen = (state: RootState) => state.toast.isOpen;
export const selectToast = (state: RootState) => state.toast;

export default toastSlice;
