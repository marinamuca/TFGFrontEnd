import { Grid } from '@mui/material';
import IllustrationCard from './components/IllustrationCard';

interface ListIllustrationsProps{
    illustrations?: [];
}

const IllustrationList = (props: ListIllustrationsProps) => {
  return (
    <Grid container spacing={2}>
      {props.illustrations?.map((illustration: any) => (
        <Grid item xs={12} sm={6} md={4} key={illustration.id}>
          <IllustrationCard illustration={illustration} />
        </Grid>
      ))}
    </Grid>
  );
};

export default IllustrationList