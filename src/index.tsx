import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {RecoilRoot} from "recoil";
import {ThemeProvider} from "styled-components";
import {lightTheme} from "./theme";




ReactDOM.render(

      <RecoilRoot>
          <ThemeProvider theme={lightTheme} >
              <App />
          </ThemeProvider>
      </RecoilRoot>
  ,
  document.getElementById("root")
);