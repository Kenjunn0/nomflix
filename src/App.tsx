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
          <BiggerBox>
              {/*<button onClick={() => x.set(0)}>HI</button>*/}
              <Box
                  style={{ x, rotateZ }}
                  drag = "x"
                  dragSnapToOrigin
              />
          </BiggerBox>
      </Wrapper>
  );
}

export default App;