import React from 'react'
import Button from '@mui/material/Button';
import Exhibitions from '../components/test/Exhibitions'
import NewExhibitionForm from './Gallery/components/NewExhibitionForm/NewExhibitionForm';
import NewIllustrarionForm from './Exhibition/components/IllustrationForm/IllustrationForm';
import ExhibitionList from '../components/ExhibitionList/ExhibitionList';
import { Container } from '@mui/material';
import { useAppDispatch } from '../hooks/appHooks';  
import { openModal, setContent, setTitle } from '../redux/modalSlice';


const Home = () => {
    const dispatch = useAppDispatch();
    const modalContent = <NewExhibitionForm/>
    const modalillustration = <NewIllustrarionForm id_exhibition={"61"}/>

    const handleCreateExhibitionClick = () => {
        dispatch(openModal());
        dispatch(setTitle("Crear Exposición"));
        dispatch(setContent(modalContent));
    }

    const handleCreateIlustrationlick = () => {
        dispatch(openModal());
        dispatch(setTitle("Crear Ilustración"));
        dispatch(setContent(modalillustration));
    }

  return (
        <Container>
            <a className="btn btn-outline-primary" href='/Galaxy'>
                Go to Galaxy
            </a>
         
            <Button variant='outlined' href='/room'>Button</Button>

            <ExhibitionList></ExhibitionList>
            <Button sx={{ mt: 1 }} variant='contained' onClick={handleCreateExhibitionClick}>Crear Exposicion</Button>
            <Button sx={{ mt: 1, ml: 1}} variant='contained' onClick={handleCreateIlustrationlick}>Crear Ilustracion</Button>

        </Container>
    )
}


export default Home