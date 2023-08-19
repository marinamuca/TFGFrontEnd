import { useParams } from "react-router";
import { useGetExhibitionByIDQuery } from "../../../domain/api/apiSlice";
import { useAppDispatch } from "../../../hooks/appHooks";
import { openModal, setContent, setTitle } from "../../../redux/modalSlice";
import ExhibitionForm from "../../Gallery/components/ExhibitionForm";
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

    const handleEditClick = () => {
        dispatch(openModal());
        dispatch(setTitle("Editar Exposición"));
        dispatch(setContent(<ExhibitionForm exhibition={exhibition}/>));
    }

    return {handleCreateIlustrationClick, handleEditClick, exhibition, isLoading, isFetching};
}
export default useExhibitionCard;