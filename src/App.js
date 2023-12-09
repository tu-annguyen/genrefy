import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import About from "./components/About";

function App() {
  return (
    <div class="bg-gray-900 h-full flex-col content-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes> 
    </div>
  );
}

export default App;
