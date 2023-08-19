import { CircularProgress } from "@mui/material";
import { QueryStatus } from "@reduxjs/toolkit/dist/query";
import Cookies from "js-cookie";
import React, { ReactElement, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/appHooks";
import { checkSession, selectSessionStatus } from "../../../redux/authSlice";

interface SessionWrapperProps {
  children: ReactElement;
}

const SessionWrapper = ({ children }: SessionWrapperProps) => {
  const dispatch = useAppDispatch();
  const requestStatus = useAppSelector(selectSessionStatus);

  useEffect(() => {
    const session = Cookies.get("session");
    const parsedSession = JSON.parse(session as string);
    dispatch(checkSession(parsedSession));
  }, []);

  if (requestStatus === QueryStatus.fulfilled) return children;
  
  return <CircularProgress />;
};

export default React.memo(SessionWrapper);
