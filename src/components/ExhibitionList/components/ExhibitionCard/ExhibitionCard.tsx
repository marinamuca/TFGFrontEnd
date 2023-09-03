import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  CardActionArea,
  Chip,
  Box,
} from "@mui/material";
import { useDimensions } from "../../../../hooks/appHooks";
import useExhibitionCard from "./hooks/useExhibitionCard";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useTranslation } from "react-i18next";

interface ExhibitionCardProps {
  exhibition: any;
  home?: boolean;
}

const ExhibitionCard: React.FC<ExhibitionCardProps> = ({
  exhibition,
  home,
}) => {
  const { t } = useTranslation(["models"]);
  const maxIllustrations = useDimensions(
    exhibition.room_width,
    exhibition.room_length
  );
  const {
    handleDeleteClick,
    userID,
    handleExhibitionClick,
    hanldeProfileClick,
    username,
  } = useExhibitionCard(exhibition.id, exhibition.artist);

  const buttonStyle = { mr: 1, ml: 1 };
  return (
    <Card variant="outlined" key={exhibition.id}>
      <CardActionArea onClick={handleExhibitionClick}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              mb: 1,
            }}
          >
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              {t("exhibition")}
            </Typography>
            {home ? (
              <Chip
                icon={<AccountCircleIcon />}
                label={username}
                color="primary"
                size="small"
              />
            ) : (
              ""
            )}
          </Box>
          <Typography variant="h5" component="div">
            {exhibition.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {t("theme")}: {exhibition.theme}
          </Typography>

          <Typography variant="body2">
            {t("roomDimensions")}: {exhibition.room_width} x{" "}
            {exhibition.room_length}
          </Typography>
          <Typography variant="body2">
            {t("illustrationCount")}: {exhibition.illustrations.length} /{" "}
            {maxIllustrations.max}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          size="small"
          variant="outlined"
          href={"/room/" + exhibition.id}
          color="info"
          sx={buttonStyle}
          startIcon={<VisibilityIcon />}
        >
          {t("3DRoom")}
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
            {t("delete", { ns: "common" })}
          </Button>
        ) : home ? (
          <Button
            size="small"
            variant="outlined"
            color="info"
            sx={buttonStyle}
            onClick={hanldeProfileClick}
            startIcon={<AccountCircleIcon />}
          >
            {t("profile", { ns: "auth" })}
          </Button>
        ) : (
          ""
        )}
      </CardActions>
    </Card>
  );
};

export default ExhibitionCard;
