import { Grid } from "@mui/material";
import IllustrationCard from "./components/IllustrationCard/IllustrationCard";
import React from "react";

interface ListIllustrationsProps {
  illustrations?: [];
  artist?: string;
}

const IllustrationList = (props: ListIllustrationsProps) => {
  return (
    <Grid container spacing={2}>
      {props.illustrations?.map((illustration: any) => (
        <Grid item xs={12} sm={6} md={4} key={illustration.id}>
          <IllustrationCard illustration={illustration} artist={props.artist}/>
        </Grid>
      ))}
    </Grid>
  );
};

export default React.memo(IllustrationList);
