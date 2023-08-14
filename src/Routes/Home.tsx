import { useQuery } from "react-query";
import {getTrendingContent, IGetContentsResult} from "../api";
import {makeIamgePath} from "../utilities";
import { motion } from "framer-motion"

import Slider from "../Components/Silder";

function Home() {
    const { data, isLoading } = useQuery<IGetContentsResult>(['movies', 'nowPlaying'], () => getTrendingContent('movie' ) );

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
                        <h2 className="title">{`${data?.results[0].title} ${data?.results[0].release_date ? `(${data?.results[0].release_date?.slice(0, 4)})` : ""}`}</h2>
                        <p className="overview">{data?.results[0].overview}</p>
                    </motion.div>
                </>
            }
            <div className="flex flex-col gap-48">
                <Slider type={"movie"} section={'now_playing'} />
                <Slider type={"movie"} section={"popular"} />
                <Slider type={"movie"} section={"top_rated"} />
                <Slider type={"movie"} section={"upcoming"} />
            </div>
        </div>
    )
}


export default Home;