import { useGetExhibitionsQuery } from "../../domain/api/apiSlice";
import { Grid } from "@mui/material";
import ExhibitionCard from "./components/ExhibitionCard/ExhibitionCard";
import React from "react";

const ExhibitionList = () => {
  const {
    data: exhibitions = [],
    error,
    isLoading,
    isFetching,
  } = useGetExhibitionsQuery(null);

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    const errMsg = "error" in error ? error.error : "";
    return <div>Error: {errMsg} </div>;
  }

  return (
    <Grid container spacing={2} display="flex">
      {exhibitions?.map((exhibition: any) => (
        <Grid item xs={12} sm={6} md={4} key={exhibition.id}>
          <ExhibitionCard exhibition={exhibition} />
        </Grid>
      ))}
    </Grid>
  );
};

export default React.memo(ExhibitionList);
