import React from 'react'
import Button from '@mui/material/Button';
import Exhibitions from '../components/Exhibitions'
import ModalButton from '../components/ModalButton'
import NewExhibitionForm from '../pages/NewExhibition';


const Home = () => {
    const modalContent = <NewExhibitionForm/>

  return (
        <div>
            <a className="btn btn-outline-primary" href='/Galaxy'>
                Go to Galaxy
            </a>
         
            <Button variant='outlined' href='/GltfScene'>Button</Button>

            <ModalButton modalContent={modalContent} title="Crear Exposición" buttonLabel='Crear Exposición'/>
    

        </div>
    )
}

export default Home