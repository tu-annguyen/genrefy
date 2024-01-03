import NavBar from "../NavBar";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div class="h-screen">
      <NavBar />
        
      <div class="flex justify-center items-center h-4/6 bg-green-500">
        <div class="flex-col items-center">
          <h1 class="text-3xl text-white font-bold">Find the genre of any Spotify song</h1>
          <button onClick={() => navigate("../")} class="bg-violet-700 text-white font-medium py-2 px-4 mt-5 rounded">Try it out</button>
        </div>
      </div>

      <div class="text-white p-24">
        <p class="mb-5">The most interesting tracks to Genrefy are those with many artists. The Spotify Web API stores genre data for each artist; therefore, the more artists there are in a track, the more data you will see.</p>
        <p class="mb-5">This application was developed by <a class="text-green-500" href="https://tu-annguyen.me">Tu-An Nguyen</a> using ReactJS and TailwindCSS.</p>
      </div>
    </div>
  );
}

export default About;