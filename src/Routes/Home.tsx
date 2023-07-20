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

const Box = styled(motion.div)`
  background-color: white;
  height: 200px;
  font-size: 40px;
  font-weight: 600;
  color: red;
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

function Home() {
    const { data, isLoading } = useQuery<IGetMoviesResult>(['movies', 'nowPlaying'], getMovies);
    const [ index, setIndex ] = useState(0)
    const increaseIndex = () => setIndex((prev) => ++prev);

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
                        <AnimatePresence>
                            <Row
                                key={index}
                                variants={rowVariants}
                                transition={{type:"spring", duration: 1}}
                                initial = "hidden"
                                animate = "visible"
                                exit = "exit"
                            >
                                {[1, 2, 3, 4, 5, 6].map((item) => (
                                    <Box key={item}>{item}</Box>
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