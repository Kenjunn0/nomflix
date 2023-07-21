import { useQuery } from "react-query";
import {getMovies, IGetMoviesResult} from "../api";
import styled from "styled-components";
import {makeIamgePath} from "../utilities";
import {AnimatePresence, motion, useScroll} from "framer-motion"
import {useState} from "react";
import {useNavigate} from "react-router";
import {useMatch} from "react-router-dom";

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
  width: 100%;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position : absolute;
  
`

const Box = styled(motion.div)<{bgPhoto : string}>`
  background-color: white;
  height: 200px;
  font-size: 40px;
  font-weight: 600;
  background-image: url(${props => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`

const Info = styled(motion.div)`
  width: 100%;
  padding: 20px;
  background-color: ${props => props.theme.black.darker };
  opacity: 0;
  position: absolute;
  h4 {
    text-align: center;
    font-size: 10px;
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

const infoVariants = {
    hover: {
        opacity: 1,
        transition: {
            delay : 0.3,
            type: "tween"
        }
    }
}

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  background-color: red;
  left: 0;
  right: 0;
  margin: 0 auto;
`

const offset : number = 6;


function Home() {
    const { data, isLoading } = useQuery<IGetMoviesResult>(['movies', 'nowPlaying'], getMovies);
    const [ index, setIndex ] = useState(0)
    const [ leaving, setLeaving ] = useState(false);
    const navigate = useNavigate();
    const bigMovieMatch = useMatch("/movies/:movieId");
    const { scrollY, } = useScroll();

    const increaseIndex = () => {
        if (data) {
            if (leaving) return;
            toggleLeaving();
            const totalMovies = data?.results.length;
            const maxIndex = Math.floor(totalMovies / offset);
            setIndex((prev) => (prev === maxIndex ? 0 : ++prev));
        }
    }
    const toggleLeaving = () => {
        setLeaving((prev) => !prev);
    }
    const onBoxClicked = (movieId : number) => {
        navigate(`/movies/${movieId}`)
    }

    const onOverlayClick = () => {
        navigate(`/`);
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
                                        layoutId={movie.id + ""}
                                        key={movie.id}
                                        variants={boxVariants}
                                        initial="normal"
                                        whileHover="hover"
                                        transition={{type: "tween"}}
                                        bgPhoto={makeIamgePath(movie.backdrop_path|| "", "w400")}
                                        onClick={() => onBoxClicked(movie.id)}
                                    >
                                        <Info
                                            variants={infoVariants}
                                        >
                                            <h4>{movie.title}</h4>
                                        </Info>
                                    </Box>
                                ))}
                            </Row>
                        </AnimatePresence>
                    </Slider>
                    <AnimatePresence>
                        {bigMovieMatch ?
                            <>
                                <Overlay
                                    onClick={onOverlayClick}
                                    animate={{ opacity: 1}}
                                    exit={{ opacity: 0}}
                                />
                                <BigMovie
                                layoutId={bigMovieMatch.params.movieId}
                                style={{ top: scrollY.get() + 100 }}
                            />
                            </>
                            :
                            null
                        }
                    </AnimatePresence>
                </>
            }
        </Wrapper>
    )
}

export default Home;