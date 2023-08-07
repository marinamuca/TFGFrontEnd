import { Button, Box, Card, CardActions, CardContent, Typography } from '@mui/material';

interface ExhibitionCardProps {
    exhibition: any
}

const ExhibitionCard = (props: ExhibitionCardProps) => {
    const maxIllustrations = parseInt(props.exhibition.room_width) * 2 + parseInt(props.exhibition.room_length) * 2;

    return (
      <Card variant="outlined" key={props.exhibition.id}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Exposicion
          </Typography>
          <Typography variant="h5" component="div">
            {props.exhibition.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Temática: {props.exhibition.theme}
          </Typography>
          <Typography variant="body2">
            Tamaño Sala: {props.exhibition.room_width} x{" "}
            {props.exhibition.room_length}
          </Typography>
          <Typography variant="body2">
            Número de ilustraciones: {props.exhibition.illustrations.length} /{" "}
            {maxIllustrations}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="outlined"
            href={"/exhibition/" + props.exhibition.id}
            color="info"
            sx={{ ml: 1, mr: 1, width: '50%' }}
          >
            gestionar
          </Button>
          <Button
            size="small"
            variant="outlined"
            href={"/room/" + props.exhibition.id}
            color="info"
            sx={{ mr: 1, ml: 1, width: '50%' }}
          >
            Ver sala 3D
          </Button>
        </CardActions>
      </Card>
    );
}

export default ExhibitionCard