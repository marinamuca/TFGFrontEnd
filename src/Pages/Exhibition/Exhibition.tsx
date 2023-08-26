import IllustrationList from "../../components/IllustrarionList";
import { Box, Container, Paper, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import useExhibition from "./hooks/useExhibition";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDimensions } from "../../hooks/appHooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { capitalize } from "../../constants";

const Exhibition = () => {
  const { t } = useTranslation(["exhibition"]);
  const {
    handleCreateIlustrationClick,
    isFetching,
    isLoading,
    exhibition,
    handleEditClick,
    userID,
  } = useExhibition();

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  const maxIllustrations = useDimensions(
    exhibition.room_width,
    exhibition.room_length
  );


  return (
    <Container>
      <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
        <Typography component="div" variant="h4">
          {exhibition.name}
        </Typography>
        {userID == exhibition.artist ? (
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={handleEditClick}
          >
            {t("edit", { ns: "common" })}
          </Button>
        ) : (
          ""
        )}
      </Box>
      <Box display="flex" sx={{ mt: 1 }}>
        <Typography
          component="div"
          variant="subtitle1"
          color="grey"
          fontWeight={400}
        >
          {t("theme")}: {exhibition.theme}
        </Typography>
      </Box>
      <Box display="flex" sx={{ mt: 1 }}>
        <Typography component="div" variant="subtitle1" fontWeight={400}>
          {t("roomInfo")}: {exhibition.room_width} x {exhibition.room_length}.{" "}
          {t("max")} {maxIllustrations.max} {t("illustrations").toLowerCase()}.
        </Typography>
      </Box>
      <Button
        sx={{ mt: 1 }}
        variant="outlined"
        color="info"
        href={`/room/${exhibition.id}`}
        startIcon={<VisibilityIcon />}
      >
        {t("view3DRoom")}
      </Button>
      <Box display="flex" justifyContent="space-between" sx={{ mt: 2, mb: 1 }}>
        <Typography component="div" variant="h4">
          {t("illustrations")} ({exhibition.illustrations.length}/
          {maxIllustrations.max})
        </Typography>
        {userID == exhibition.artist ? (
          <Button
            sx={{ mt: 1 }}
            startIcon={<AddCircleIcon />}
            variant="contained"
            onClick={handleCreateIlustrationClick}
            disabled={exhibition.illustrations.length >= maxIllustrations.max}
          >
            {t("newIllustration")}
          </Button>
        ) : (
          ""
        )}
      </Box>
      <Box sx={{ maxHeight: "100% !important", overflow: "auto" }}>
        <IllustrationList
          illustrations={exhibition.illustrations}
          artist={exhibition.artist}
        />
      </Box>
    </Container>
  );
};

export default React.memo(Exhibition);
