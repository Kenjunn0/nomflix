import {createGlobalStyle} from "styled-components";
import styled from "styled-components";
import {motion, useMotionValue, useMotionValueEvent, useScroll, useTransform} from "framer-motion";
import {useEffect} from "react";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-weight: 300;
  font-family: 'Source Sans Pro', sans-serif;
  background-color:${(props) => props.theme.bgColor};
  color: black;
  line-height: 1.2;
}
a {
  text-decoration:none;
  color:inherit;
}
`;

const Wrapper = styled(motion.div)`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 1000px;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 1);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const Circle = styled(motion.div)`
  background-color: white;
  height: 70px;
  width: 70px;
  border-radius: 35px;
  place-self: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1);
`;

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  border-radius: 100px;
  background-color: rgba(255, 255, 255, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

const boxVariants = {
    hover: { scale: 1, rotateZ: 90 },
    click : { scale: 1, borderRadius: "100px" },
    drag : {backgroundColor: "rgb(46, 204, 113)", transition: {duration: 10}}
};

const Svg = styled.svg`
  width:  300px;
  height: 300px;
  color: white;
  path {
    stroke: white;
    stroke-width: 2;
  }
`

const svg = {
    start : {
        pathLength: 0,
        fill: "rgba(255,255,255,0)"
    },
    end : {
        pathLength: 1,
        fill: "rgba(255,255,255,1)",
    }
}



function App() {
    const x = useMotionValue(0);
    const rotateZ = useTransform(x, [-500, 0, 500], [-360, 0, 360])
    const gradient = useTransform(x, [-500, 0, 500],
        [
            "linear-gradient(0deg, rgb(0, 0, 153), rgb(0, 245, 222) )",
            "linear-gradient(135deg, rgb(138, 0, 153), rgb(0, 245, 222) )" ,
            "linear-gradient(270deg, rgb(255, 100, 153), rgb(0, 245, 222) )"
        ]
    )
    const { scrollY, scrollYProgress } = useScroll();


    useMotionValueEvent(scrollY, "change", (i) => console.log(i));
    useMotionValueEvent(x, "change", (i) => console.log(i))


  return (
      <Wrapper style={{ background : gradient}}>
          {/*<BiggerBox>*/}
              {/*<button onClick={() => x.set(0)}>HI</button>*/}
              {/*<Box*/}
              {/*    style={{ x, rotateZ }}*/}
              {/*    drag = "x"*/}
              {/*    dragSnapToOrigin*/}
              {/*/>*/}
          {/*</BiggerBox>*/}
          <Svg
              xmlns="http://www.w3.org/2000/svg"
              focusable="false"
              viewBox="0 0 448 512">
              <motion.path
                  variants={svg}
                  initial="start"
                  animate="end"
                  transition={{
                      default: {duration : 5},
                      fill : {duration: 2 , delay: 3 }
                  }}
                  d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z"
              >
              </motion.path>
          </Svg>
      </Wrapper>
  );
}

export default App;