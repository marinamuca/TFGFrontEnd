// import { Button, Col, Row, Form } from 'react-bootstrap';
import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';
import { useCreateIllustrationMutation } from '../features/api/apiSlice';
import { Illustration } from '../features/types';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const NewIllustrationForm = () => {
    const [addIllustration, response] = useCreateIllustrationMutation()

    const [illustration, setIllustration] = useState<Illustration>({
        title: "",
        description: "",
        image: null,
        date: "2023-03-05"
    });

    function handleSubmit(event: any) {
        event.preventDefault();
        let formData = new FormData();
        formData.append('title', illustration.title);
        formData.append('description', illustration.description);
        formData.append('date_painted', illustration.date);
        formData.append('image', illustration.image as File, illustration.image!.name);
        formData.append('exhibition', 61);

        addIllustration(formData);
    }

    // if (response.error) {
    //     console.log(response.error)
    // }

    return (
        <FormControl sx={{ m: 3 }}>
            <TextField size='small' label="Nombre de la Sala" sx={{ mb: 3 }} value={illustration.title} onChange={(e) => { setIllustration({ ...illustration, title: e.target.value }) }} fullWidth></TextField>
            <TextField size='small' label="Temática de la Sala" sx={{ mb: 3 }} value={illustration.description} onChange={(e) => { setIllustration({ ...illustration, description: e.target.value }) }} fullWidth></TextField>
            {/* <TextField size='small' placeholder="Ancho de la Sala" label="Ancho" sx={{mb: 3}} value={illustration.date} onChange={(e) => {setIllustration({...illustration, date: e.target.value })}} fullWidth></TextField> */}
            {/* <TextField size='small' placeholder="Largo de la Sala" label="Largo" sx={{mb: 3}} value={illustration.image} onChange={(e) => {setIllustration({...illustration, image: e.target.value })}} fullWidth></TextField> */}
            <DatePicker label="Fecha de realización"></DatePicker>
            <input type='file' accept="image/png, image/jpeg, image/jpg" onChange={(e) => { setIllustration({ ...illustration, image: e.target.files![0] }) }} ></input>
            <Button variant='contained' type='submit' onClick={handleSubmit}>Crear</Button>
        </FormControl>

    )
}

export default NewIllustrationForm