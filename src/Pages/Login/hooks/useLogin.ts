import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { INDEX_PATH } from "../../../constants";
import { useLoginMutation } from "../../../domain/api/apiSlice";
import { LoginErrorData, UserLogin } from "../../../domain/types/types";

const useLogin = () => {
  const navigate = useNavigate();
  const [login, response] = useLoginMutation();
  const [user, setUser] = useState<UserLogin>();
  const [error, setError] = useState<LoginErrorData>({});

  useEffect(() => {
    if (response.isError) {
      if ("data" in response.error)
        setError(response.error.data as LoginErrorData); //TODO si error non_field_errors to toast
    } else if (response.isSuccess) {
      navigate(INDEX_PATH);
    }
  }, [response]);

  const handleSubmit = () => {
    login(user);
  };
  const handleInputChange = (field: string, value: string) => {
    setUser({ ...user!, [field]: value });
  };

  return { handleSubmit, user, handleInputChange, error };
};

export default useLogin;
