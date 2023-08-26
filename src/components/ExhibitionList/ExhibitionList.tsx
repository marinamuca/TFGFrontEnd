import { useGetExhibitionsQuery } from "../../domain/api/apiSlice";
import { Grid } from "@mui/material";
import ExhibitionCard from "./components/ExhibitionCard/ExhibitionCard";
import React from "react";

interface ExhibitionListProps {
  exhibitions?: [];
  home?: boolean;
}

const ExhibitionList: React.FC<ExhibitionListProps> = ({exhibitions, home}) => {
  return (
    <Grid container spacing={2} display="flex">
      {exhibitions?.map((exhibition: any) => (
        <Grid item xs={12} sm={6} md={4} key={exhibition.id}>
          <ExhibitionCard exhibition={exhibition} home={home}/>
        </Grid>
      ))}
    </Grid>
  );
};

export default React.memo(ExhibitionList);
