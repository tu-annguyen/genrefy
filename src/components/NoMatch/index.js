import NavBar from "../NavBar";

const NoMatch = () => {
  return (
    <div class="bg-gray-900 h-full flex-col content-center">
      <NavBar />
      <div class="h-screen text-white">
        <h2 class="font-bold text-3xl my-5">404: Invalid path</h2>
        <a href="/" class="bg-green-500 text-white font-medium py-2 px-4 my-5 rounded">Return Home</a>
      </div>
    </div>
  );
}

export default NoMatch;