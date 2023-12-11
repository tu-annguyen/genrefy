import NavBar from "../NavBar";
import Search from "../Search";

function Home() {
  return (
    <div class="bg-gray-900 h-full flex-col content-center">
      <NavBar />
      <Search />
      <div class="bg-gray-900 flex-auto"></div>
    </div>
  );
}

export default Home;