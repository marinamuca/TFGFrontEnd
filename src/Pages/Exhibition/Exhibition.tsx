import { useParams } from 'react-router';
import { useGetExhibitionByIDQuery } from '../../features/api/apiSlice';
import ListIllustrations from '../Illustration/ListIllustrations';
import NewIllustrationForm from '../Illustration/NewIllustrationForm';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import { useAppDispatch } from '../../hooks/appHooks';
import { openModal, setContent, setTitle } from '../../features/modalSlice';

type params = {
    id: string
}

const Exhibition = () => {
    
    const { id } = useParams<params>();
    const dispatch = useAppDispatch();
    const {data: exhibition, isLoading, isFetching} =  useGetExhibitionByIDQuery(id)

    
    if (isLoading || isFetching) {
        return <div>Loading...</div>;
    }
    
    const modalContent = <NewIllustrationForm id_exhibition={exhibition.id}></NewIllustrationForm>
    const handleCreateIlustrationlick = () => {
        dispatch(openModal());
        dispatch(setTitle("Crear Ilustración"));
        dispatch(setContent(modalContent));
    }
    console.log(exhibition)

    return (
        <Container sx={{ m: 1 }}>
            <ListIllustrations illustrations={exhibition.illustrations}/>
            <Button sx={{ mt: 1 }} variant='contained' onClick={handleCreateIlustrationlick}>Nueva Ilustración</Button>
        </Container>

    );
}

export default Exhibition