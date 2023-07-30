import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';

interface ExhibitionCardProps {
    exhibition: any
}

const ExhibitionCard = (props: ExhibitionCardProps) => {
   
    return (
        <Card variant="outlined" key={props.exhibition.id}>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Exposicion
            </Typography>
            <Typography variant='h5' component="div">
                {props.exhibition.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Temática: {props.exhibition.theme}
            </Typography>
            <Typography variant="body2">
                Tamaño Sala: {props.exhibition.room_width} x {props.exhibition.room_length}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" href={'/exhibition/' + props.exhibition.id} color="info">gestionar exposción</Button>
            <Button size="small" href={'/room/' + props.exhibition.id} color="info">Ver sala 3D</Button>
        </CardActions>
    </Card>
    )
}

export default ExhibitionCard