import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {RecoilRoot} from "recoil";
import {createGlobalStyle, ThemeProvider} from "styled-components";
import {Theme} from "./theme";

const GlobalStyle = createGlobalStyle`

`

ReactDOM.render(
    <React.StrictMode>
      <RecoilRoot>
          <ThemeProvider theme={Theme} >
              <GlobalStyle />
              <App />
          </ThemeProvider>
      </RecoilRoot>
    </React.StrictMode>
  ,
  document.getElementById("root")
);