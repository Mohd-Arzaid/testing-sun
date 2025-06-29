import { Route, Routes } from "react-router-dom";
import Navbar from "./common/Navbar";
import TopBar from "./common/TopBar";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <TopBar />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
