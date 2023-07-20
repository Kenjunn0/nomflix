import { useQuery } from "react-query";
import { getMovies } from "../api";

function Home() {
    const { data, isLoading } = useQuery(['movies', 'nowPlaying'], getMovies);

    console.log( isLoading, data );

    return <div style={{backgroundColor: "#FFFFFF", height: "200vh"}}></div>;
}

export default Home;