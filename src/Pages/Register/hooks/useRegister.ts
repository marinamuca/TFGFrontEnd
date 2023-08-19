import { useEffect, useState } from "react";
import { useRegisterMutation } from "../../../domain/api/apiSlice";
import { RegisterErrorData, UserRegister } from "../../../domain/types/types";

type profileTypes = {
  [key: string]: string;
};

const useRegister = () => {
  const [register, response] = useRegisterMutation();
  const [user, setUser] = useState<UserRegister>();
  const [error, setError] = useState<RegisterErrorData>({});

  const profileTypes: profileTypes = {
    ARTIST: "Artista",
    VISITOR: "Visitante",
  };

  const profileTypeHelper: profileTypes = {
    ARTIST: "Artista: Permite crear tus propias exposiciones.",
    VISITOR: "Visitante: Sólo para visitar las exposiciones de otros.",
  };

  useEffect(() => {
    if (response.isError) {
      if ("data" in response.error)
        setError(response.error.data as RegisterErrorData); //TODO si error non_field_errors to toast
    } else if (response.isSuccess) {
      window.location.replace("/login");
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
