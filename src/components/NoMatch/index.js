import NavBar from "../NavBar";

const NoMatch = () => {
  return (
    <div class="bg-gray-900 h-full flex-col content-center">
      <NavBar />
      <div class="flex justify-center items-center">
        <div>
          <h1 class="text-white font-medium text-3xl m-5">404: Invalid URL</h1>
          <a href="/" class="bg-green-500 text-white font-medium py-2 px-4 mx-16 rounded">Return Home</a>
        </div>
      </div>
    </div>
  );
}

export default NoMatch;