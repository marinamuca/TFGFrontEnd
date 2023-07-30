import { useGetExhibitionsQuery, apiSlice, useCreateExhibitionsMutation } from '../../features/api/apiSlice';

const ExhibitionsComponent = () => {
    // const {data: exhibitions = [], error, isLoading, isFetching} = useGetExhibitionsQuery(null)
    const [ trigger, { data: exhibitions = [], error, isLoading, isFetching } ] = apiSlice.endpoints.getExhibitions.useLazyQuery()
    const [ addExhibition, response] = useCreateExhibitionsMutation()

    const onClickPost = () => {
        let data = {
            name: "ususus",
            theme: "Prueba"
        }
        addExhibition(data)
    }
    const onClickGet = () => {
        trigger(null)
    }

    if (isLoading || isFetching) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        const errMsg = 'error' in error ? error.error : ""
        return <div>Error: {errMsg} </div>;
    }

    return (
        <div>
            <a className="btn btn-outline-primary" onClick={(e) => {onClickGet()}}>
                Load Exhibitions
            </a>
            <a className="btn btn-outline-primary" onClick={(e) => {onClickPost()}}>
                Post Exhibition
            </a>
            {exhibitions?.map((exhibition: any) => (
                <div key={exhibition.id}>
                    <h3>{exhibition.name}</h3>
                    <p>{exhibition.theme}</p>
                </div>
            ))}
        </div>
    );
};

export default ExhibitionsComponent;
