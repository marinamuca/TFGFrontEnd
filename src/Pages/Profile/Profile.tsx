import React from "react";
import { Box, Container, Paper, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useProfile from "./hooks/useProfile";
import ExhibitionList from "../../components/ExhibitionList";
import { useTranslation } from "react-i18next";

const Profile: React.FC = () => {
  const { t } = useTranslation(["auth"]);
  const {
    user,
    selfProfile,
    isLoading,
    isFetching,
    handleCreateExhibitionClick,
    handleChangeProfileType,
  } = useProfile();

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
        <Typography component="div" variant="h4">
          {user?.username}
        </Typography>
        {selfProfile ? (
          <Button startIcon={<EditIcon />} onClick={handleChangeProfileType}>
            {user?.profile_data.is_artist ? t("changeToVisitor") : t("changeToArtist")}
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
          {user?.profile_data.is_artist ? t("artist") : t("visitor")}
        </Typography>
      </Box>
      {selfProfile ? (
        <Box display="flex" sx={{ mt: 1 }}>
          <Typography component="div" variant="subtitle1" fontWeight={400}>
            {user?.email}
          </Typography>
        </Box>
      ) : (
        ""
      )}
      <Box display="flex" justifyContent="space-between" sx={{ mt: 2, mb: 1 }}>
        <Typography component="div" variant="h4">
          {t("exhibitions", {ns: "exhibition"})}
        </Typography>
        {selfProfile && user?.profile_data.is_artist ? (
          <Button
            sx={{ mt: 1 }}
            startIcon={<AddCircleIcon />}
            variant="contained"
            onClick={handleCreateExhibitionClick}
          >
            {t("newExhibition", {ns: "exhibition"})}
          </Button>
        ) : (
          ""
        )}
      </Box>
      <Box sx={{ maxHeight: "100% !important", overflow: "auto" }}>
        <ExhibitionList exhibitions={user.profile_data.exhibitions} />
      </Box>
    </Container>
  );
};

export default React.memo(Profile);
