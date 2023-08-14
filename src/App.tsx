import {Routes, Route, BrowserRouter} from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Components/Header";


function App() {

  return (
      <BrowserRouter>
          <Header />
          <Routes>
              <Route path="/tv" element={<Tv />} />
              <Route path="/search" element={<Search />} />
              <Route path="/search/:type/:id" element={<Search />} />
              <Route path="/" element={<Home />} />
              <Route path="/movie/:section/:id" element={<Home />} />
              <Route path="/tv/:section/:id" element={<Tv />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
