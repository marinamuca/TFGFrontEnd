import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useIllustrationCard from "./hooks/useIllustrationCard";
import { useTranslation } from "react-i18next";

interface IllustrationCardProps {
  illustration: any;
  artist?: string;
}

const IllustrationCard: React.FC<IllustrationCardProps> = ({
  illustration, artist
}) => {
  const {t} = useTranslation(['exhibition'])
  const placed = illustration.position > -1;
  const {
    handleDeleteClick,
    responseDelete,
    handleClick,
    handleEditClick,
    userID,
  } = useIllustrationCard(illustration, illustration.image);


  if (responseDelete.isError) {
    console.log(responseDelete.error);
  } else if (responseDelete.isSuccess) {
    location.reload();
  }

  return (
    <Card variant="outlined" key={illustration.id} sx={{ heigth: "100%" }}>
      <CardActionArea
        onClick={() => {
          handleClick();
        }}
      >
        <CardMedia
          sx={{ height: 0, paddingTop: "100%" }}
          image={illustration.image}
          title={illustration.title}
        />
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {t('illustration')}
          </Typography>
          <Typography variant="h5" component="div">
            {illustration.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {illustration.description}
          </Typography>
          <Typography variant="body2">{illustration.date_painted}</Typography>
          <Typography variant="body2">
            {placed ? t('illustrationPlaced') : t('illustrationNotPlaced')}
          </Typography>
        </CardContent>
      </CardActionArea>
      {userID == artist ? (
        <CardActions>
          <Button
            size="small"
            variant="outlined"
            color="info"
            sx={{ mr: 1, ml: 1, width: "45%" }}
            startIcon={<EditIcon />}
            onClick={handleEditClick}
          >
            {t('edit', {ns: 'common'})}
          </Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            sx={{ ml: 1, mr: 1, width: "55%" }}
            startIcon={<DeleteIcon />}
            onClick={handleDeleteClick}
          >
            {t('delete', {ns: 'common'})}
          </Button>
        </CardActions>
      ) : (
        ""
      )}
    </Card>
  );
};

export default IllustrationCard;
