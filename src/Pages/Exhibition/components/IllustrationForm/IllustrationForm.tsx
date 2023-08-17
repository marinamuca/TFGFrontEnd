import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';
import { useCreateIllustrationMutation, useUpdateIllustrationMutation } from '../../../../domain/api/apiSlice';
import { IllustrationInput } from '../../../../domain/types/types';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { MuiFileInput } from 'mui-file-input';
import { API_DATE_FORMAT } from '../../../../constants';

interface IllustrarionFormProps {
    id_exhibition: string
    illustration?: any;
}

const IllustrationForm = (props: IllustrarionFormProps) => {
    let [sendIllustration, response] = useCreateIllustrationMutation();
    if (props.illustration)
      [sendIllustration, response] = useUpdateIllustrationMutation();

    const [illustration, setIllustration] = useState<IllustrationInput>({
      title: props.illustration ? props.illustration.title : "",
      description: props.illustration ? props.illustration.description : "",
      image: null,
      date: props.illustration ? props.illustration.date_painted : "",
      exhibition: props.id_exhibition
    });

    function handleSubmit(event: any) {
        event.preventDefault();

        let formData = new FormData();
        formData.append('title', illustration.title);
        formData.append('description', illustration.description);
        formData.append('date_painted', illustration.date);
        if (illustration.image) formData.append('image', illustration.image as File);
        formData.append('exhibition', illustration.exhibition);

        if (props.illustration)
          sendIllustration({ id: props.illustration.id, body: formData });
        else sendIllustration(formData);
    }

    if(response.isError){
        console.log(response.error)
    } else if(response.isSuccess){
        window.location.reload();
    }

    return (
        <FormControl sx={{ m: 3 }}>
            <TextField size='small' label="Titulo de la ilustración" sx={{ mb: 3 }} value={illustration.title} onChange={(e) => { setIllustration({ ...illustration, title: e.target.value }) }} fullWidth></TextField>
            <TextField size='small' label="Descripción de la ilustración" sx={{ mb: 3 }} value={illustration.description} onChange={(e) => { setIllustration({ ...illustration, description: e.target.value }) }} fullWidth></TextField>
    
            <DatePicker disableFuture sx={{ mb: 3 }} label="Fecha de realización" value={dayjs(illustration.date)} format='DD/MM/YYYY' onChange={(e: Dayjs | null) => {setIllustration({...illustration, date: e!.format(API_DATE_FORMAT)})}}/>
         
            <MuiFileInput sx={{ mb: 3 }} placeholder={props.illustration? `Modificar imagen` : "Selecciona una imagen"} value={illustration.image} onChange={(e: File | null) => { setIllustration({ ...illustration, image: e }) }} fullWidth/>

            <Button variant='contained' type='submit' onClick={handleSubmit}>Crear</Button>
        </FormControl>
    )
}

export default IllustrationForm