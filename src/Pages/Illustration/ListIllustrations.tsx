import { useGetIllustrationsQuery } from '../../features/api/apiSlice';
import { Box, Grid } from '@mui/material';
import IllustrationCard from '../../components/IllustrationCard';

interface ListIllustrationsProps{
    illustrations?: [];
}

const ListIllustrations = (props: ListIllustrationsProps) => {

    return (
        <Box>
            <Grid container spacing={2}>
                {props.illustrations?.map((illustration: any) => (
                    <Grid item xs={6} sm={4} md={3} key={illustration.id} >
                        <IllustrationCard illustration={illustration} />
                    </Grid>
                ))}
            </Grid>
        </Box>

    );
}

export default ListIllustrations