import {ArrowLeftIcon, ArrowRightIcon} from "@chakra-ui/icons";
import {AnimatePresence, motion, useScroll} from "framer-motion";
import {makeIamgePath} from "../utilities";
import {useEffect, useState} from "react";
import {PathMatch, useNavigate} from "react-router";
import {useMatch} from "react-router-dom";
import {getContents, IGetContentsResult, ISliderProps} from "../api";
import {useQuery} from "react-query";

const rowVariants = {
    hidden : (isBack:boolean) => ({
        x: isBack ? window.outerWidth + 10 : -window.outerWidth - 10,
    }),
    visible : {
        x: 0,
    },
    exit : (isBack : boolean) => ({
        x: isBack ? -window.outerWidth - 10 : window.outerWidth + 10,
    })

}

const boxVariants = {
    normal : {
        scale : 1,
    },
    hover: {
        scale: 1.3,
        y:  -50,
        zIndex: 5,
        boxShadow: "0px 5px 15px 2px",
        transition: {
            delay : 0.1,
            type: "spring"
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


const offset : number = 6;

export default function Slider({type, section}: ISliderProps) {
    //data
    const { data, isLoading } = useQuery<IGetContentsResult>([type, section], () => getContents({ type, section }));
    const [ index, setIndex ] = useState(0);
    const [ leaving, setLeaving ] = useState(false);
    const [ isBack, setIsBack ] = useState(false);
    const navigate = useNavigate();
    const { scrollY, } = useScroll();


    let contentPathMatch = useMatch(`/${type}/${section}/:id`);
    let clickedContent = contentPathMatch?.params.id && data?.results.find(content => String(content.id) === contentPathMatch?.params.id);


    const toggleLeaving = () => {
        setLeaving((prev) => !prev);
    }

    const changeIndex = ( Arrow : "RIGHT" | "LEFT" ) => {
        if (data) {
            if (leaving) return;
            toggleLeaving();
            const totalMovies = data?.results.length;
            const maxIndex = Math.floor(totalMovies / offset);
            if(Arrow === "RIGHT") {
                setIndex((prev) => prev === maxIndex ? 0 : ++prev)
            };
            if(Arrow === "LEFT") {
                setIndex((prev) => prev === 0 ? maxIndex : --prev)
            };
        }
    }
    const onBoxClicked = (type : string, id : number) => {
        if(type === "movie") navigate(`/movie/${section}/${id}`)
        if(type === "tv") navigate(`/tv/${section}/${id}`)

    }

    const onOverlayClick = () => {
        if(type === "movie") navigate(`/`);
        if(type === "tv") navigate(`/tv`);

    }

    return (
        <>
            <div className="slider">
                <div className="flex flex-row items-center">
                    <button
                        onClick={() => {
                            setIsBack(false)
                            changeIndex("LEFT")
                        }}
                        className="flex w-12 h-12 rounded-2xl opacity-70 bg-white "
                    >
                        <ArrowLeftIcon color={"red.500"} className="place-self-center m-4 fill-amber-400" />
                    </button>
                    <h1 className="text-2xl p-5 text-amber-400 italic font-bold " >{section.toUpperCase()}</h1>
                    <button
                        onClick={() => {
                            setIsBack(true);
                            changeIndex("RIGHT")
                        }}
                        className="flex w-12 h-12 rounded-2xl opacity-70 bg-white"
                    >
                        <ArrowRightIcon className="place-self-center m-4" />
                    </button>
                </div>
                <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                    <motion.div
                        className="row"
                        key={index}
                        custom={isBack}
                        variants={rowVariants}
                        transition={{type:"linear", duration: 1}}
                        initial = "hidden"
                        animate = "visible"
                        exit = "exit"
                    >
                        {data?.results.slice(1).slice(offset*index, offset*( index + 1 )).map((content) => (
                            <motion.div
                                className="box"
                                layoutId={content.id + type + section}
                                key={content.id}
                                variants={boxVariants}
                                initial="normal"
                                whileHover="hover"
                                transition={{type: "spring"}}
                                style={{
                                    backgroundImage : `url(${makeIamgePath(content.backdrop_path|| "", "w400")})`
                                }}
                                onClick={() => onBoxClicked(type, content.id)}
                            >
                                <motion.div
                                    className="info"
                                    variants={infoVariants}
                                >
                                    <h4 className="text-white">{content.title ? content.title : content.name}</h4>
                                    {content.release_date && <h4 className="text-white">{`(${content.release_date?.slice(0, 4)})`}</h4>}
                                    {content.first_air_date && <h4 className="text-white">{`(${content.first_air_date?.slice(0, 4)})`}</h4>}
                                    <div className="bg-orange-500 rounded-2xl text-xs text-red-900 p-2 mt-2">{content.vote_average} </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div  >
            <AnimatePresence>
            {contentPathMatch ?
                <>
                    <motion.div
                        className="overlay"
                        onClick={onOverlayClick}
                        animate={{ opacity: 1}}
                        exit={{ opacity: 0}}
                    />
                    <motion.div
                        className="modal-movie"
                        layoutId={contentPathMatch.params.id + type + section}
                        style={{ top: scrollY.get() + 100 }}
                    >

                        {clickedContent &&
                            <>
                                <motion.div className="modal-movie-cover" style={{
                                    backgroundImage : `url( ${makeIamgePath(clickedContent.backdrop_path, "w500")} )`
                                }}  />
                                <h3 className="modal-movie-title">{clickedContent.title || clickedContent.name}</h3>
                                <p className="modal-movie-overview">{clickedContent.overview}</p>
                            </>
                        }

                    </motion.div>
                </>
                :
                null
            }
            </AnimatePresence>
        </>
    )
}