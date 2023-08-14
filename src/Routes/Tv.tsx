import {motion} from "framer-motion";
import {makeIamgePath} from "../utilities";
import Slider from "../Components/Silder";
import {useQuery} from "react-query";
import { getTrendingContent, IGetContentsResult} from "../api";

function Tv() {
    const { data, isLoading } = useQuery<IGetContentsResult>(['movies', 'nowPlaying'], () => getTrendingContent('tv' ) );

    return (
        <div className="wrapper">
            {isLoading ?
                <div className="loading">Loading</div>
                :
                <>
                    <motion.div className="banner" style={{
                        backgroundImage : `url(${makeIamgePath(data?.results[0].backdrop_path|| "")})`,
                    }}>
                        <p className="today-icon">Trending</p>
                        <h2 className="title">{`${data?.results[0].name} ${data?.results[0].first_air_date ? `(${data?.results[0].first_air_date?.slice(0, 4)})` : ""} `}</h2>
                        <p className="overview">{data?.results[0].overview}</p>
                    </motion.div>
                </>
            }
            <div className="flex flex-col gap-48">
                <Slider type={"tv"} section={'airing_today'} />
                <Slider type={"tv"} section={"popular"} />
                <Slider type={"tv"} section={"top_rated"} />
            </div>
        </div>
    );
}

export default Tv;