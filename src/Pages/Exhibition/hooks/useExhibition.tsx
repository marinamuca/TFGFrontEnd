import { useParams } from "react-router";
import { useGetExhibitionByIDQuery } from "../../../domain/api/apiSlice";
import { useAppDispatch } from "../../../hooks/appHooks";
import { openModal, setContent, setTitle } from "../../../redux/modalSlice";
import NewIllustrationForm from "../components/NewIllustrationForm/NewIllustrationForm";

type params = {
    id: string
}

const useExhibition = () => {
    const { id } = useParams<params>();
    const dispatch = useAppDispatch();
    const {data: exhibition, isLoading, isFetching} = useGetExhibitionByIDQuery(id)

    const handleCreateIlustrationClick = () => {
        dispatch(openModal());
        dispatch(setTitle("Crear Ilustración"));
        dispatch(setContent(<NewIllustrationForm id_exhibition={exhibition.id}></NewIllustrationForm>));
    }

    return {handleCreateIlustrationClick, exhibition, isLoading, isFetching};
}
export default useExhibition;