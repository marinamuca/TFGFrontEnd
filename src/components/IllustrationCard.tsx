import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

interface IllustrationCardProps {
    illustration: any
}

const IllustrationCard = (props: IllustrationCardProps) => {
   
    return (
        <Card variant="outlined" key={props.illustration.id}>
            <CardMedia
                sx={{ height: 0, paddingTop: '100%' }}
                image={props.illustration.image}
                title={props.illustration.title}
            />
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Ilustración
            </Typography>
            <Typography variant='h5' component="div">
                {props.illustration.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {props.illustration.description}
            </Typography>
            <Typography variant="body2">
                {props.illustration.date_painted}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" href='/illustration'>gestionar Ilustración</Button>
        </CardActions>
    </Card>
    )
}

export default IllustrationCard