import Cookies from "js-cookie";
import React, { useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom";
import { LOGIN_PATH } from "../constants";
import { useAppSelector } from "../hooks/appHooks";
import { selectToken } from "../redux/authSlice";
import SessionWrapper from "./components/SessionWrapper";

const AuthRoute = ({children}: {children: JSX.Element}) => {
  const session = Cookies.get("session");
  const navigate = useNavigate();
  const token: string = useAppSelector(selectToken);

  useEffect(() => {
    if(!token && !session){
      navigate(LOGIN_PATH);
      location.reload();
    }
  }, [navigate, session, token])

  if(!session) {
    return <Navigate to={LOGIN_PATH} replace/>
  }

  return <SessionWrapper>{children}</SessionWrapper>
}

export default React.memo(AuthRoute);