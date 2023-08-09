import IllustrationList from '../../components/IllustrarionList';
import { Box, Container, Paper, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import useExhibition from './hooks/useExhibition';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDimensions } from '../../hooks/appHooks';

const Exhibition = () => {
    
    const {handleCreateIlustrationClick, isFetching, isLoading, exhibition} = useExhibition();
    
    if (isLoading || isFetching) {
        return <div>Loading...</div>;
    }

    const maxIllustrations = useDimensions(exhibition.room_width, exhibition.room_length)
    
    return (
      <Container>
        <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
          <Typography component="div" variant="h4">
            {exhibition.name}
          </Typography>
          <Button variant="contained" startIcon={<EditIcon />}>
            Editar
          </Button>
        </Box>
        <Box display="flex" sx={{ mt: 1 }}>
          <Typography component="div" variant="subtitle1" color='grey' fontWeight={400}>
            Temática: {exhibition.theme}
          </Typography>
        </Box>
        <Box display="flex" sx={{ mt: 1 }}>
          <Typography component="div" variant="subtitle1" fontWeight={400}>
            Sala: {exhibition.room_width} x {exhibition.room_length}. Máximo {maxIllustrations.max} ilustraciones
          </Typography>
        </Box>
        <Button
          sx={{ mt: 1 }}
          variant="outlined"
          color='info'
          href={`/room/${exhibition.id}`}
          startIcon={<VisibilityIcon />}
        >
          Ver Sala 3D
        </Button>
        <Box display="flex" justifyContent="space-between" sx={{ mt: 2, mb: 1 }}>
          <Typography component="div" variant="h4">
            Ilustraciones ({exhibition.illustrations.length}/{maxIllustrations.max})
          </Typography>
          <Button
          sx={{ mt: 1 }}
          startIcon={<AddCircleIcon/>}
          variant="contained"
          onClick={handleCreateIlustrationClick}
          disabled={exhibition.illustrations.length >= maxIllustrations.max}
        >
          Nueva Ilustración
        </Button>
        </Box>
        <Box sx={{maxHeight: "100% !important", overflow: 'auto'}}>

        <IllustrationList illustrations={exhibition.illustrations} />
     
        </Box>
      </Container>
    );
}

export default Exhibition