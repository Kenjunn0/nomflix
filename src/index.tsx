import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {RecoilRoot} from "recoil";
import { QueryClient, QueryClientProvider } from "react-query"
import './global.css'
import {ChakraProvider, theme} from "@chakra-ui/react";


const client = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
      <RecoilRoot>
          <QueryClientProvider client={client}>
              <ChakraProvider theme={theme}>
                  <App />
              </ChakraProvider>
          </QueryClientProvider>
      </RecoilRoot>
    </React.StrictMode>
  ,
  document.getElementById("root")
);