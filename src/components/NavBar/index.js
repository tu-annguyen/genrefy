import Login from "../Login";

const Navbar = () => {
  return(
    <nav class="flex flex-wrap items-center justify-between w-screen h-16 border-b-2 border-gray-700 mx-auto p-4 mb-5">
      <a href="#" class="text-white font-bold text-xl">GENREIFY</a>
      <ul class="flex justify-end font-medium text-white">
        <li class="px-2">
          <a href="#">Home</a>
        </li>
        <li class="px-2">
          <a href="#">About</a>
        </li>
        <li class="px-2">
          <a href="https://tu-annguyen.me/#contact-me">Contact</a>
        </li>
        <li class="px-2">
          <Login />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;