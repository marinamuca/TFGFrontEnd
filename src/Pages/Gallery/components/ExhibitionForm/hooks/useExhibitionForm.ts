import { useEffect, useState } from "react";
import {
  useCreateExhibitionsMutation,
  useUpdateExhibitionMutation,
} from "../../../../../domain/api/apiSlice";
import {
  Exhibition,
  ExhibitionErrorData,
} from "../../../../../domain/types/types";
import { useAppSelector } from "../../../../../hooks/appHooks";
import { selectUserID } from "../../../../../redux/authSlice";

const useExhibitionForm = (exhibitionData?: any) => {
  let [sendExhibition, response] = useCreateExhibitionsMutation();
  const artist = useAppSelector(selectUserID);

  if (exhibitionData)
    [sendExhibition, response] = useUpdateExhibitionMutation();

  const [error, setError] = useState<ExhibitionErrorData>({});

  const [exhibition, setExhibition] = useState<Exhibition>({
    name: exhibitionData ? exhibitionData.name : "",
    theme: exhibitionData ? exhibitionData.theme : "",
    room_width: exhibitionData ? exhibitionData.room_width : "",
    room_length: exhibitionData ? exhibitionData.room_length : "",
    artist: artist,
  });

  useEffect(() => {
    if (response.isError) {
      if ("data" in response.error)
        setError(response.error.data as ExhibitionErrorData);
      console.log(error);
    } else if (response.isSuccess) {
      window.location.reload();
    }
  }, [response]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (exhibitionData)
      sendExhibition({ id: exhibitionData.id, body: exhibition });
    else sendExhibition(exhibition);
  };

  const setValue = (field: string, value: string) => {
    setExhibition({ ...exhibition!, [field]: value });
  };

  const btnLabel = exhibitionData ? "Editar" : "Crear";

  return { exhibition, setValue, error, handleSubmit, btnLabel };
};

export default useExhibitionForm;
