import { useEffect, useState } from "react";
import {
  useCreateIllustrationMutation,
  useUpdateIllustrationMutation,
} from "../../../../../domain/api/apiSlice";
import {
  IllustrationInput,
  IllustrationErrorData,
} from "../../../../../domain/types/types";

const useIllustrationForm = (id_exhibition: string, illustrationData?: any) => {
  let [sendIllustration, response] = useCreateIllustrationMutation();
  if (illustrationData)
    [sendIllustration, response] = useUpdateIllustrationMutation();

  const [illustration, setIllustration] = useState<IllustrationInput>({
    title: illustrationData ? illustrationData.title : "",
    description: illustrationData ? illustrationData.description : null,
    image: null,
    date: illustrationData ? illustrationData.date_painted : "",
    exhibition: id_exhibition,
  });

  const [error, setError] = useState<IllustrationErrorData>({});

  useEffect(() => {
    if (response.isError) {
      if ("data" in response.error)
        setError(response.error.data as IllustrationErrorData);
      console.log(error);
    } else if (response.isSuccess) {
      window.location.reload();
    }
  }, [response]);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append("title", illustration.title);
    formData.append("description", illustration.description);
    formData.append("date_painted", illustration.date);
    if (illustration.image)
      formData.append("image", illustration.image as File);
    formData.append("exhibition", illustration.exhibition);

    if (illustrationData)
      sendIllustration({ id: illustrationData.id, body: formData });
    else sendIllustration(formData);
  };

  const setValue = (field: string, value: string | File ) => {
    setIllustration({ ...illustration!, [field]: value });
  };

  const btnLabel = illustrationData ? "Editar" : "Crear";

  return { illustration, setValue, error, handleSubmit, btnLabel };
};

export default useIllustrationForm;
