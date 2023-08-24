import React from "react";
import ExhibitionList from "../../components/ExhibitionList";
import { Button } from "@mui/material";
import useHome from "./hooks/useHome";

const Home: React.FC = () => {
  const { handleCreateExhibitionClick, isLoading, isFetching, exhibitions } =
    useHome();

  if (isLoading || isFetching) {
    <div>Loading...</div>;
  }

  return (
    <>
      <ExhibitionList exhibitions={exhibitions} home />
    </>
  );
};

export default React.memo(Home);
