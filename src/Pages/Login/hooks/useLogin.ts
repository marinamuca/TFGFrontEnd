import { useEffect, useState } from "react";
import { useLoginMutation } from "../../../domain/api/apiSlice";
import { LoginErrorData, UserLogin } from "../../../domain/types/types";

const useLogin = () => {
    const [login, response] = useLoginMutation();
    const [user, setUser] = useState<UserLogin>();
    const [error, setError] = useState<LoginErrorData>({});
    
    useEffect(() => {
        if (response.isError) {
            if('data' in response.error) setError(response.error.data as LoginErrorData); //TODO si error non_field_errors to toast
          } else if (response.isSuccess) {
            window.location.replace("/");
          }
      }, [response])

    const handleSubmit = () => {
        login(user);
    }
    const handleInputChange = ( field: string, value: string ) => {
        setUser({...user!, [field]: value})
    }

    return {handleSubmit, user, handleInputChange, error};

}

export default useLogin;