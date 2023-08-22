import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_PATH } from "../../../constants";
import { useRegisterMutation } from "../../../domain/api/apiSlice";
import { RegisterErrorData, UserRegister } from "../../../domain/types/types";

type profileTypes = {
  [key: string]: string;
};

const useRegister = () => {
  const [register, response] = useRegisterMutation();
  const [user, setUser] = useState<UserRegister>();
  const [error, setError] = useState<RegisterErrorData>({});
  const navigate = useNavigate();

  const profileTypes: profileTypes = {
    true: "Artista",
    false: "Visitante",
  };

  const profileTypeHelper: profileTypes = {
    ARTIST: "Artista: Permite crear tus propias exposiciones.",
    VISITOR: "Visitante: Sólo para visitar las exposiciones de otros.",
  };

  useEffect(() => {
    if (response.isError) {
      if ("data" in response.error)
        setError(response.error.data as RegisterErrorData);
    } else if (response.isSuccess) {
      navigate(LOGIN_PATH);
    }
  }, [response]);

  const handleSubmit = () => {
    console.log(user);
    register(user);
  };
  const handleInputChange = (field: string, value: string) => {
    setUser({ ...user!, [field]: value });
  };

  return {
    handleSubmit,
    user,
    handleInputChange,
    error,
    profileTypes,
    profileTypeHelper,
  };
};

export default useRegister;
