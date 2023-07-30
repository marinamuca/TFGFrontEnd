import { useGetExhibitionsQuery, apiSlice } from '../../features/api/apiSlice';
import { Box, Grid } from '@mui/material';
import ExhibitionCard from '../../components/ExhibitionCard';

const ListExhibitions = () => {
    const {data: exhibitions = [], error, isLoading, isFetching} = useGetExhibitionsQuery(null)

    if (isLoading || isFetching) {
        return <div>Loading...</div>;
    }

    if (error) {
        const errMsg = 'error' in error ? error.error : ""
        return <div>Error: {errMsg} </div>;
    }

    return (
   
        <Box sx={{ m: 1 }}>
            <Grid container spacing={2}>
                {exhibitions?.map((exhibition: any) => (
                    <Grid item xs={6} sm={4} md={3} key={exhibition.id} >
                        <ExhibitionCard exhibition={exhibition} />
                    </Grid>
                ))}
            </Grid>
        </Box>

    );
}

export default ListExhibitions