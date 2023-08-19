import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { User } from "../domain/types/types";
import { login, getUserDetail } from "../domain/api/apiSlice";
import Cookies from "js-cookie";

interface AuthState {
  token: string;
  user?: User;
}

const initialState: AuthState = {
  token: Cookies.get("token")?? "",
  user: JSON.parse(Cookies.get("user") ?? "{}").user ?? null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, { payload }: PayloadAction<AuthState>) => {
      state.token = payload.token;
    },
    removeSession: (state) => {
      Cookies.set("token", "");
      Cookies.set("user", "");
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(login.matchFulfilled, (state, { payload: { key } }) => {
      state.token = key;
      Cookies.set(
        "token",
        key
      );
    });
    builder.addMatcher(
      getUserDetail.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
        Cookies.set(
          "user",
          JSON.stringify({
            user: payload
          })
        );
      }
    );
  },
});

export default authSlice.reducer;
