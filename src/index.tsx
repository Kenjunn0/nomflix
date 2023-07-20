import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {RecoilRoot} from "recoil";
import {createGlobalStyle, ThemeProvider} from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query"
import {Theme} from "./theme";

const GlobalStyle = createGlobalStyle`

`

const client = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
      <RecoilRoot>
          <QueryClientProvider client={client}>
              <ThemeProvider theme={Theme} >
                  <GlobalStyle />
                  <App />
              </ThemeProvider>
          </QueryClientProvider>
      </RecoilRoot>
    </React.StrictMode>
  ,
  document.getElementById("root")
);