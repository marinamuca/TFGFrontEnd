import Cookies from "js-cookie";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_PATH } from "../../../../constants";
import { logout } from "../../../../domain/api/apiSlice";
import { useAppDispatch, useAppSelector } from "../../../../hooks/appHooks";
import { removeSession, selectToken } from "../../../../redux/authSlice";

const useSession = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector(selectToken);
  const session = Cookies.get("session");

  const handleLogout = useCallback(async () => {
    if (token) {
      await dispatch(logout.initiate({}));
    }
    dispatch(removeSession());
    navigate(LOGIN_PATH);
  }, [token]);

  return { token, session, handleLogout };
};
export default useSession;
