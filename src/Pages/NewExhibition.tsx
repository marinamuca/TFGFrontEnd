// import { Button, Col, Row, Form } from 'react-bootstrap';
import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';
import { Exhibition } from '../features/types'
import { useCreateExhibitionsMutation } from '../features/api/apiSlice';


const NewExhibitionForm = () => {
    const [addExhibition, response] = useCreateExhibitionsMutation()

    const [exhibition, setExhibition] = useState<Exhibition>({
        name: "",
        theme: "",
        room_width: "",
        room_height: ""
    });

    function handleSubmit(event: any){
        event.preventDefault();
        addExhibition(exhibition)
        console.log(exhibition)
    }

    return (
        <FormControl sx={{m: 3, width: 225}}>
            <TextField size='small' label="Nombre de la Exposición" sx={{mb: 3}} value={exhibition.name} onChange={(e) => {setExhibition({...exhibition, name: e.target.value })}} fullWidth></TextField>
            <TextField size='small' label="Temática de la Exposición" sx={{mb: 3}} value={exhibition.theme} onChange={(e) => {setExhibition({...exhibition, theme: e.target.value })}} fullWidth></TextField>
            <TextField size='small' label="Ancho de la Sala 3D" sx={{mb: 3}} value={exhibition.room_width} onChange={(e) => {setExhibition({...exhibition, room_width: e.target.value })}} fullWidth></TextField>
            <TextField size='small' label="Largo de la Sala 3D" sx={{mb: 3}} value={exhibition.room_height} onChange={(e) => {setExhibition({...exhibition, room_height: e.target.value })}} fullWidth></TextField>
            <Button variant='contained' type='submit' onClick={handleSubmit}>Crear</Button>
        </FormControl>
    )
}

export default NewExhibitionForm