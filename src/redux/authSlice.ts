import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { User } from "../domain/types/types";
import { login } from "../domain/api/apiSlice";
import Cookies from 'js-cookie';

interface AuthState {
  token: string;
  user?: User;
}

const initialState: AuthState = {
  token: JSON.parse(Cookies.get("session")??"").token ?? ""  ,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, { payload }: PayloadAction<AuthState>) => {
      state.token = payload.token;
    },
    removeSession: (state) => {
      Cookies.set("session", "")
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(login.matchFulfilled, (state, { payload: { key } }) => {
      state.token = key;
      Cookies.set(
        "session",
        JSON.stringify({
          token: key,
        })
      )
    });
  },
});

export default authSlice.reducer;
