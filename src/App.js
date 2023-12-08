import './App.css';
import NavBar from "./components/NavBar";
import Search from "./components/Search";

function App() {
  return (
    <div class="bg-gray-900 h-screen w-screen flex-col content-center">
      <NavBar />
      <Search />
    </div>
  );
}

export default App;
