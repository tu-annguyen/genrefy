import Login from "../Login";

const NavBar = () => {
  return(
    <nav class="flex flex-wrap flex-none items-center justify-between h-20 w-full border-b-4 border-gray-700 mx-auto p-4 mb-5">
      <a href="/" class="text-white font-bold text-xl">GENREIFY</a>
      <ul class="flex items-center justify-end font-medium text-white">
        <li class="px-2">
          <a href="/">Home</a>
        </li>
        <li class="px-2">
          <a href="/about">About</a>
        </li>
        <li class="px-2">
          <a href="https://tu-annguyen.me/#contact-me" target="_blank" rel="noopener noreferrer">Contact</a>
        </li>
        <li class="px-2">
          <Login />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;