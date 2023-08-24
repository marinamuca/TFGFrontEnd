import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";
import { useDimensions } from "../../../../hooks/appHooks";
import useExhibitionCard from "./hooks/useExhibitionCard";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface ExhibitionCardProps {
  exhibition: any;
  home?: boolean;
}

const ExhibitionCard: React.FC<ExhibitionCardProps> = ({ exhibition, home }) => {
  const maxIllustrations = useDimensions(
    exhibition.room_width,
    exhibition.room_length
  );
  const { handleDeleteClick, userID, handleExhibitionClick } = useExhibitionCard(
    exhibition.id
  );

  const buttonStyle = { mr: 1, ml: 1, width: "50%" };
  return (
    <Card variant="outlined" key={exhibition.id}>
      <CardActionArea onClick={handleExhibitionClick}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Exposicion
          </Typography>
          <Typography variant="h5" component="div">
            {exhibition.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Temática: {exhibition.theme}
          </Typography>
          <Typography variant="body2">
            Tamaño Sala: {exhibition.room_width} x {exhibition.room_length}
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
          startIcon={<VisibilityIcon />}
        >
          Sala 3D
        </Button>
        {exhibition.artist == userID && !home ? (
          <Button
            size="small"
            variant="contained"
            color="error"
            sx={buttonStyle}
            onClick={handleDeleteClick}
            startIcon={<DeleteIcon />}
          >
            Eliminar
          </Button>
        ) : (
          null
        )}
      </CardActions>
    </Card>
  );
};

export default ExhibitionCard;
