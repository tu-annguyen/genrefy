import axios from "axios";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar";

const Track = () => {
  const token = window.localStorage.getItem("token");
  const { id } = useParams();
  const genres = [];

  const getTrack = async (e) => {
    const {data} = await axios.get("https://api.spotify.com/v1/tracks/" + id, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      id: id,
    }
    });
    
    for (let i = 0; i < data.artists.length; i++) {
      try {
        data.artists.genres.forEach((g) => genres.push(g));
      } catch (e) {
        console.log("No genres found.");
      }
    }
  }

  const renderGenres = () => {
    getTrack();

    if (genres.length === 0) {
      return (
        <div>No genres found.</div>
      )
    }

    return (
      genres.map(genre => (
        <div>
          <h2>{ genre }</h2>
        </div>
      ))
    );
  }

  return (
    <div class="bg-gray-900 h-full flex-col content-center">
      <NavBar />
      <div class="text-white">
        { renderGenres() }
      </div>
    </div>
  );
}

export default Track;