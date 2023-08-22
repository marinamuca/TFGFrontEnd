import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useGetExhibitionByIDQuery } from "../../../domain/api/apiSlice";
import { useAppDispatch, useDimensions } from "../../../hooks/appHooks";
import { openModal, setContent, setTitle } from "../../../redux/modalSlice";
import ExhibitionForm from "../../Profile/components/ExhibitionForm";
import IllustrationForm from "../components/IllustrationForm/IllustrationForm";

type params = {
  id: string;
};

const useExhibitionCard = () => {
  const { id } = useParams<params>();
  const dispatch = useAppDispatch();
  const {
    data: exhibition,
    isLoading,
    isFetching,
  } = useGetExhibitionByIDQuery(id);

  const [maxIllustrations, setMaxIllustrations] = useState<number>(0);
  useEffect(() => {
    if (exhibition) {
      setMaxIllustrations(
        useDimensions(exhibition.room_width, exhibition.room_length).max
      );
    }
  }, [exhibition]);

  const handleCreateIlustrationClick = () => {
    dispatch(openModal());
    dispatch(setTitle("Crear Ilustración"));
    dispatch(
      setContent(
        <IllustrationForm id_exhibition={exhibition.id}></IllustrationForm>
      )
    );
  };

  const handleEditClick = () => {
    dispatch(openModal());
    dispatch(setTitle("Editar Exposición"));
    dispatch(setContent(<ExhibitionForm exhibition={exhibition} />));
  };

  return {
    handleCreateIlustrationClick,
    handleEditClick,
    exhibition,
    isLoading,
    isFetching,
    maxIllustrations,
  };
};
export default useExhibitionCard;
