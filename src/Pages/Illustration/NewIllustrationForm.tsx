import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';
import { useCreateIllustrationMutation } from '../../features/api/apiSlice';
import { Illustration } from '../../features/types';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import FileUpload from '../../components/FileUpload';
import { useParams } from 'react-router';

interface NewIllustrarionFormProps {
    id_exhibition: string
}

const NewIllustrationForm = (props: NewIllustrarionFormProps) => {
    const [sendCreateIllustration, response] = useCreateIllustrationMutation()

    const [illustration, setIllustration] = useState<Illustration>({
        title: "",
        description: "",
        image: null,
        date: "",
        exhibition: props.id_exhibition
    });

    function handleSubmit(event: any) {
        event.preventDefault();

        let formData = new FormData();
        formData.append('title', illustration.title);
        formData.append('description', illustration.description);
        formData.append('date_painted', illustration.date);
        formData.append('image', illustration.image as File);
        formData.append('exhibition', illustration.exhibition);

        sendCreateIllustration(formData);
    }

    return (
        <FormControl sx={{ m: 3 }}>
            <TextField size='small' label="Titulo de la ilustración" sx={{ mb: 3 }} value={illustration.title} onChange={(e) => { setIllustration({ ...illustration, title: e.target.value }) }} fullWidth></TextField>
            <TextField size='small' label="Descripción de la ilustración" sx={{ mb: 3 }} value={illustration.description} onChange={(e) => { setIllustration({ ...illustration, description: e.target.value }) }} fullWidth></TextField>
    
            <DatePicker sx={{ mb: 3 }} label="Fecha de realización" onChange={(e: Dayjs | null) => {setIllustration({...illustration, date: e!.format('YYYY-MM-DD')})}}></DatePicker>
         
            <FileUpload file={illustration.image} accept="image/png, image/jpeg, image/jpg" onChange={(e) => { setIllustration({ ...illustration, image: (e.target as HTMLInputElement).files![0] }) }}></FileUpload>

            <Button variant='contained' type='submit' onClick={handleSubmit}>Crear</Button>
        </FormControl>
    )
}

export default NewIllustrationForm