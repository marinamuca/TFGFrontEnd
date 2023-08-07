import IllustrationList from '../../components/IllustrarionList';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import useExhibition from './hooks/useExhibition';

const Exhibition = () => {
    
    const {handleCreateIlustrationClick, isFetching, isLoading, exhibition} = useExhibition();
    
    if (isLoading || isFetching) {
        return <div>Loading...</div>;
    }
    
    return (
        <Container sx={{ m: 1 }}>
            <IllustrationList illustrations={exhibition.illustrations}/>
            <Button sx={{ mt: 1 }} variant='outlined' onClick={handleCreateIlustrationClick}>Nueva Ilustración</Button>
            <Button sx={{ mt: 1, ml: 1 }} variant='contained' href={`/room/${exhibition.id}`}>Ver Sala 3D</Button>
        </Container>
    );
}

export default Exhibition