import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import About from "./components/About";
import Track from "./components/Track";
import NoMatch from "./components/NoMatch";

function App() {
  return (
    <div class="bg-gray-900 h-full flex-col content-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/track/:id" element={<Track />} />
        <Route path="*" element={<NoMatch />} />
      </Routes> 
    </div>
  );
}

export default App;
