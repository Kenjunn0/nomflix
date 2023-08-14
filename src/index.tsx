import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {RecoilRoot} from "recoil";
import { QueryClient, QueryClientProvider } from "react-query"
import './global.css'


const client = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
      <RecoilRoot>
          <QueryClientProvider client={client}>
                  <App />
          </QueryClientProvider>
      </RecoilRoot>
    </React.StrictMode>
  ,
  document.getElementById("root")
);