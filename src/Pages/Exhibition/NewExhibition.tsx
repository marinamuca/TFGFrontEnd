import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';
import { Exhibition } from '../../features/types'
import { useCreateExhibitionsMutation } from '../../features/api/apiSlice';


const NewExhibitionForm = () => {
    const [addExhibition, response] = useCreateExhibitionsMutation()

    const [exhibition, setExhibition] = useState<Exhibition>({
        name: "",
        theme: "",
        room_width: "",
        room_length: ""
    });

    function handleSubmit(event: any){
        event.preventDefault();
        addExhibition(exhibition)
    }

    if(response.isError){
        console.log(response.error)
    } else if(response.isSuccess){
        window.location.reload();
    }


    return (
        <FormControl sx={{m: 3, width: 225}}>
            <TextField size='small' label="Nombre de la Exposición" sx={{ mb: 3 }} value={exhibition.name} onChange={(e) => { setExhibition({ ...exhibition, name: e.target.value }) }} fullWidth></TextField>
            <TextField size='small' label="Temática de la Exposición" sx={{mb: 3}} value={exhibition.theme} onChange={(e) => {setExhibition({...exhibition, theme: e.target.value })}} fullWidth></TextField>
            <TextField size='small' label="Ancho de la Sala 3D" sx={{mb: 3}} value={exhibition.room_width} onChange={(e) => {setExhibition({...exhibition, room_width: e.target.value })}} fullWidth></TextField>
            <TextField size='small' label="Largo de la Sala 3D" sx={{mb: 3}} value={exhibition.room_length} onChange={(e) => {setExhibition({...exhibition, room_length: e.target.value })}} fullWidth></TextField>
            <Button variant='contained' type='submit' onClick={handleSubmit}>Crear</Button>
        </FormControl>
    )
}

export default NewExhibitionForm