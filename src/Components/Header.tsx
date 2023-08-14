import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import {motion, useAnimation, useMotionValueEvent, useScroll} from "framer-motion";
import { useState } from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router";


const navVariants = {
    top: {
        backgroundColor: "rgba(0, 0, 0, 0)",
    },
    scroll: {
        backgroundColor: "rgba(17, 24, 39, 0.7)",
    },
};

interface IForm {
    keyword: string;
}

function Header() {
    const [searchOpen, setSearchOpen] = useState(false);
    const homeMatch = useMatch("/");
    const tvMatch = useMatch("/tv");
    const inputAnimation = useAnimation();
    const navAnimation = useAnimation();
    const { scrollY } = useScroll();
    const { register: registerForm, setValue, handleSubmit : handleFormSubmit } = useForm<IForm>();
    const navigate = useNavigate();

    const toggleSearch = () => {
        if (searchOpen) {
            inputAnimation.start({
                scaleX: 0,
            });
        } else {
            inputAnimation.start({ scaleX: 1 });
        }
        setSearchOpen((prev) => !prev);
    };

    const onValid = (data: IForm) => {
        navigate(`/search?keyword=${data.keyword}`);
        window.location.reload();
    }

    useMotionValueEvent(scrollY, "change", (prev) => {
       if ( prev > 80) {
           navAnimation.start("scroll");
       } else {
           navAnimation.start("top");
       }
    });

    return (
        <motion.nav className="nav-container" variants={navVariants} animate={navAnimation} initial="top">
            <div className="column mt-1">
                <img src="/Nomflix_ic.png" alt="NomflixIcon" className="h-11 w-33 p-2 mr-4"/>
                <ul className="items">
                    <li className="item">
                        <Link to="/">
                            Home {homeMatch && <motion.div className="circle" layoutId="circle" />}
                        </Link>
                    </li>
                    <li className="item">
                        <Link to="/tv">
                            Tv Shows {tvMatch && <motion.div className="circle" layoutId="circle" />}
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="column">
                <form className="search" onSubmit={handleFormSubmit(onValid)}>
                    <motion.svg
                        onClick={toggleSearch}
                        animate={{ x: searchOpen ? -270 : 0 }}
                        transition={{ type: "linear" }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                        ></path>
                    </motion.svg>
                    <motion.input
                        className="input"
                        { ...registerForm("keyword", {required : true, minLength : 2}) }
                        animate={inputAnimation}
                        initial={{ scaleX: 0 }}
                        transition={{ type: "linear" }}
                        placeholder="Search for movie or tv show..."
                    />
                </form>
            </div>
        </motion.nav>
    );
}

export default Header;