import React from "react";
import ExhibitionList from "../../components/ExhibitionList";
import { Button } from "@mui/material";
import useGallery from "./hooks/useGallery";

const Gallery: React.FC = () => {
  const { handleCreateExhibitionClick } = useGallery();

  return (
    <>
      <ExhibitionList />
      <Button
        sx={{ mt: 1 }}
        variant="contained"
        onClick={handleCreateExhibitionClick}
      >
        Crear Exposicion
      </Button>
    </>
  );
};

export default React.memo(Gallery);
