import { useCallback, useEffect } from "react";
import { TOAST_TIMEOUT } from "../../../constants";
import { useAppDispatch, useAppSelector } from "../../../hooks/appHooks";
import { selectToast, setIsOpen } from "../../../redux/toastSlice";

const useInfoToast = () => {
  const dispatch = useAppDispatch();
  const toast = useAppSelector(selectToast);

  const handleClose = useCallback((event?: React.SyntheticEvent | Event, reason?: string) => {
    if(reason === 'clickaway') return;
    dispatch(setIsOpen(false));
  }, [])

  useEffect(() => {
    if(toast.isOpen){
      setTimeout(() => {
        return dispatch(setIsOpen(false))
      }, TOAST_TIMEOUT);
    }
  }, [toast])

  return { toast, handleClose};
};

export default useInfoToast;
