import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { User } from "../domain/types/types";
import { login, getUserDetail, logout } from "../domain/api/apiSlice";
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
          user: session.user
        })
      );
      dispatch(setStatus(QueryStatus.fulfilled));
    }
  }
);

interface AuthState {
  token: string;
  status: QueryStatus;
  userStatus: QueryStatus;
  user?: User;
}

const initialState: AuthState = {
  token: "",
  status: QueryStatus.uninitialized,
  userStatus: QueryStatus.uninitialized,
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
    removeSession: (state) => {
      Cookies.set("session", "");
      state = initialState;
    },
    setLogout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(login.matchFulfilled, (state, { payload: { key } }) => {
      state.token = key;
      state.status = QueryStatus.fulfilled;
      Cookies.set(
        "session",
        JSON.stringify({
          token: key,
        })
      );
    });
    builder.addMatcher(login.matchPending, (state) => {
      state.status = QueryStatus.pending;
    });
    builder.addMatcher(login.matchRejected, (state) => {
      state.status = QueryStatus.rejected;
    }),
      builder.addMatcher(getUserDetail.matchFulfilled, (state, { payload }) => {
        state.user = payload;
        Cookies.set(
          "session",
          JSON.stringify({
            token: state.token,
            user: payload,
          })
        );
        state.userStatus = QueryStatus.fulfilled;
      });
    builder.addMatcher(getUserDetail.matchPending, (state) => {
      state.userStatus = QueryStatus.pending;
    });
    builder.addMatcher(getUserDetail.matchRejected, (state) => {
      state.userStatus = QueryStatus.rejected;
    }),
      // ! CAMBIAR
      builder.addMatcher(logout.matchFulfilled, (state, { payload }) => {
        Cookies.set("session", "{}");
        state = initialState;
      });
  },
});

export const { setSession, removeSession, setStatus } = authSlice.actions;
export const selectSessionStatus = (state: RootState) => state.auth.status;
export const selectToken = (state: RootState) => state.auth.token;
export const selectUser = (state: RootState) => state.auth.user;
export const selectUserStatus = (state: RootState) => state.auth.userStatus;
export default authSlice;
