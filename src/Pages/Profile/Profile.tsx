import React from "react";
import { Box, Container, Paper, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useProfile from "./hooks/useProfile";
import ExhibitionList from "../../components/ExhibitionList";

const Profile: React.FC = () => {
  const {
    user,
    userProfile,
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
        <Button startIcon={<EditIcon />} onClick={handleChangeProfileType}>
          Cambiar a perfil de {userProfile.is_artist ? "Visitante" : "Artista"}
        </Button>
      </Box>
      <Box display="flex" sx={{ mt: 1 }}>
        <Typography
          component="div"
          variant="subtitle1"
          color="grey"
          fontWeight={400}
        >
          {userProfile.is_artist ? "Artista" : "Visitante"}
        </Typography>
      </Box>
      <Box display="flex" sx={{ mt: 1 }}>
        <Typography component="div" variant="subtitle1" fontWeight={400}>
          {user?.email}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" sx={{ mt: 2, mb: 1 }}>
        <Typography component="div" variant="h4">
          Exposiciones
        </Typography>
        <Button
          sx={{ mt: 1 }}
          startIcon={<AddCircleIcon />}
          variant="contained"
          onClick={handleCreateExhibitionClick}
        >
          Nueva Exposición
        </Button>
      </Box>
      <Box sx={{ maxHeight: "100% !important", overflow: "auto" }}>
        <ExhibitionList exhibitions={userProfile.exhibitions} />
      </Box>
    </Container>
  );
};

export default React.memo(Profile);
