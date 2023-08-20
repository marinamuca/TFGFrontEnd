import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { User } from "../domain/types/types";
import { login, logout } from "../domain/api/apiSlice";
import Cookies from "js-cookie";
import { QueryStatus } from "@reduxjs/toolkit/dist/query";

export const checkSession = createAsyncThunk(
  "checkSession",
  async (session: { token: string; user: User }, { dispatch, getState }) => {
    const { token } = (getState() as RootState).auth;
    if (token !== session.token) {
      dispatch(
        setSession({
          token: session.token,
          user: session.user,
        })
      );
      dispatch(setStatus(QueryStatus.fulfilled));
    }
  }
);

interface AuthState {
  token: string;
  status: QueryStatus;
  user?: User;
}

const initialState: AuthState = {
  token: "",
  status: QueryStatus.uninitialized,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (
      state,
      { payload }: PayloadAction<{ token: string; user: User }>
    ) => {
      state.token = payload.token;
      state.user = payload.user;
    },
    setStatus: (state, { payload }: PayloadAction<QueryStatus>) => {
      state.status = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      login.matchFulfilled,
      (state, { payload: { token, user } }) => {
        state.token = token;
        state.user = user;
        state.status = QueryStatus.fulfilled;
        Cookies.set(
          "session",
          JSON.stringify({
            token: token,
            user: user,
          })
        );
      }
    );
    builder.addMatcher(login.matchPending, (state) => {
      state.status = QueryStatus.pending;
    });
    builder.addMatcher(login.matchRejected, (state) => {
      state.status = QueryStatus.rejected;
    });
    builder.addMatcher(logout.matchFulfilled, (state, { payload }) => {
      Cookies.set("session", "");
      state = initialState;
    });
  },
});

export const { setSession, setStatus } = authSlice.actions;
export const selectSessionStatus = (state: RootState) => state.auth.status;
export const selectToken = (state: RootState) => state.auth.token;
export const selectUser = (state: RootState) => state.auth.user;
export const selectUserID = (state: RootState) =>
  state.auth.user ? state.auth.user.id : "";
export default authSlice;
