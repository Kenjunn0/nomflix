import {createGlobalStyle} from "styled-components";
import styled from "styled-components";
import {AnimatePresence, motion, useMotionValue, useMotionValueEvent, useScroll, useTransform} from "framer-motion";
import {useEffect, useState} from "react";
import {darkTheme} from "./theme";

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
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, rgba(123, 255, 123, 1) 0%, rgba(2, 13, 55, 0.9) 90%)
`;

const Box = styled(motion.div)`
  //width: 200px;
  height: 200px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  margin: 5px;
  grid-template-columns: repeat(2, 1fr);
`;

const Circle = styled(motion.div)`
  background-color: #00a5ff;
  height: 70px;
  width: 70px;
  border-radius: 35px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1);
`;

const Grid = styled(motion.div)`
  display: grid ;
  grid-template-columns: repeat(3, 1fr);
  width: 50vw;
  div:first-child,
  div:last-child {
    grid-column: span 2;
  }
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
`;



function App() {

    const [id, setId] = useState<string | null>(null);

  return (
          <Wrapper>
              <Grid>
                  {[1, 2, 3, 4].map(item =>
                  <Box onClick={() => setId(item+"")} key={item} layoutId={item+""} />)}
              </Grid>
              <AnimatePresence>
                  { id ? <Overlay
                      onClick={() => setId(null)}
                      initial={{backgroundColor: "rgba(0, 0, 0, 0.0)"}}
                      animate={{backgroundColor: "rgba(0, 0, 0, 0.5)"}}
                      exit={{backgroundColor: "rgba(0, 0, 0, 0.0)"}}
                  >
                      <Box layoutId={id} style={{ width : 400, height: 300 }} />
                  </Overlay> : null}
              </AnimatePresence>
          </Wrapper>
  );
}

export default App;