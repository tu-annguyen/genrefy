import './App.css';
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import TextBox from "./components/TextBox";

function App() {
  return (
    <div class="bg-gray-900 h-screen">
      <NavBar />
      <Login />
      <TextBox />
    </div>
  );
}

export default App;
