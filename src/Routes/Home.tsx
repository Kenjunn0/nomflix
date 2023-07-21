import { useQuery } from "react-query";
import {getMovies, IGetMoviesResult} from "../api";
import styled from "styled-components";
import {makeIamgePath} from "../utilities";
import {AnimatePresence, motion} from "framer-motion"
import {useState} from "react";

const Wrapper = styled.div`
  background-color: black;
`

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Banner = styled.div<{bgPhoto : string}>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url(${props => props.bgPhoto});
  background-size: cover;
`

const Title = styled.h2`
  font-size: 48px;
  margin-bottom: 20px;
`

const Overview = styled.p`
  font-size: 20px;
  width: 50%;
`

const Slider = styled.div`
  position: relative;
  top: -150px
`

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position : absolute;
  width: 100%;
  
`

const Box = styled(motion.div)<{bgPhoto : string}>`
  background-color: white;
  height: 200px;
  font-size: 40px;
  font-weight: 600;
  color: red;
  background-image: url(${props => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`

const rowVariants = {
    hidden : {
        x: window.outerWidth + 10

    },
    visible : {
        x: 0,
    },
    exit : {
        x: -window.outerWidth - 10,
    }
}

const boxVariants = {
    normal : {
        scale : 1,
    },
    hover: {
        scale: 1.3,
        y:  -50,
        transition: {
            delay : 0.3,
            type: "tween"
        }
    }
}

const offset : number = 6;


function Home() {
    const { data, isLoading } = useQuery<IGetMoviesResult>(['movies', 'nowPlaying'], getMovies);
    const [ index, setIndex ] = useState(0)
    const [ leaving, setLeaving ] = useState(false);
    const increaseIndex = () => {
        if (data) {
            if (leaving) return;
            toggleLeaving();
            const totalMovies = data?.results.length;
            const maxIndex = Math.floor(totalMovies / offset);
            setIndex((prev) => (prev === maxIndex ? 0 : ++prev));
            console.log(totalMovies);
            console.log(offset*index, offset*(index+1));
        }
    }
    const toggleLeaving = () => {
        setLeaving((prev) => !prev);
    }

    return (
        <Wrapper>
            {isLoading ?
                <Loader>Loading</Loader>
                :
                <>
                    <Banner bgPhoto={makeIamgePath(data?.results[0].backdrop_path || "") }>
                        <Title>{data?.results[0].title}</Title>
                        <Overview>{data?.results[0].overview}</Overview>
                    </Banner>
                    <Slider onClick={increaseIndex}>
                        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                            <Row
                                key={index}
                                variants={rowVariants}
                                transition={{type:"spring", duration: 1}}
                                initial = "hidden"
                                animate = "visible"
                                exit = "exit"
                            >
                                {data?.results.slice(1).slice(offset*index, offset*( index + 1 )).map((movie) => (
                                    <Box
                                        key={movie.id}
                                        variants={boxVariants}
                                        initial="normal"
                                        whileHover="hover"
                                        transition={{type: "tween"}}
                                        bgPhoto={makeIamgePath(movie.backdrop_path|| "", "w400")}
                                    />
                                ))}
                            </Row>
                        </AnimatePresence>
                    </Slider>
                </>
            }
        </Wrapper>
    )
}

export default Home;