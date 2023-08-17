import { useParams } from "react-router";
import { useGetExhibitionByIDQuery } from "../../../domain/api/apiSlice";
import { useAppDispatch } from "../../../hooks/appHooks";
import { openModal, setContent, setTitle } from "../../../redux/modalSlice";
import IllustrationForm from "../components/IllustrationForm/IllustrationForm";

type params = {
    id: string
}

const useExhibitionCard = () => {
    const { id } = useParams<params>();
    const dispatch = useAppDispatch();
    const {data: exhibition, isLoading, isFetching} = useGetExhibitionByIDQuery(id)

    const handleCreateIlustrationClick = () => {
        dispatch(openModal());
        dispatch(setTitle("Crear Ilustración"));
        dispatch(setContent(<IllustrationForm id_exhibition={exhibition.id}></IllustrationForm>));
    }

    return {handleCreateIlustrationClick, exhibition, isLoading, isFetching};
}
export default useExhibitionCard;