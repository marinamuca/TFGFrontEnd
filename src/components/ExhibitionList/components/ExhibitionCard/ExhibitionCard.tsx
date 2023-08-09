import { Button, Card, CardActions, CardContent, Typography, CardActionArea } from '@mui/material';
import { useDimensions } from '../../../../hooks/appHooks';
import useExhibitionCard from './hooks/useExhibitionCard';

interface ExhibitionCardProps {
    exhibition: any
}

const ExhibitionCard: React.FC<ExhibitionCardProps>= ({exhibition}) => {
    const maxIllustrations = useDimensions(exhibition.room_width, exhibition.room_length);
    const { handleDeleteClick, responseDelete } = useExhibitionCard(exhibition.id);

    if (responseDelete.isError) {
      console.log(responseDelete.error);
    } else if (responseDelete.isSuccess) {
      window.location.reload();
    }

    const buttonStyle = { mr: 1, ml: 1, width: "50%" };
    return (
      <Card variant="outlined" key={exhibition.id}>
        <CardActionArea href={"/exhibition/" + exhibition.id}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Exposicion
            </Typography>
            <Typography variant="h5" component="div">
              {exhibition.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Temática: {exhibition.theme}
            </Typography>
            <Typography variant="body2">
              Tamaño Sala: {exhibition.room_width} x{" "}
              {exhibition.room_length}
            </Typography>
            <Typography variant="body2">
              Número de ilustraciones: {exhibition.illustrations.length} /{" "}
              {maxIllustrations.max}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
        <Button 
            size="small"
            variant="outlined"
            href={"/room/" + exhibition.id}
            color="info"
            sx={buttonStyle}
          >
            Ver sala 3D
          </Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            sx={buttonStyle}
            onClick={handleDeleteClick}
          >
            Eliminar
          </Button>
          
        </CardActions>
      </Card>
    );
}

export default ExhibitionCard