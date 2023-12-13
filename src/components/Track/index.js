import axios from "axios";
import { useParams } from "react-router-dom";
import React, {useState, useEffect} from "react";
import NavBar from "../NavBar";

const Track = () => {
  const token = window.localStorage.getItem("token");
  const { id } = useParams();
  const [genres, setGenres] = useState([]);
  const [genresObj, setGenresObj] = useState({});

  useEffect(() => {
    const getTrack = async () => {
      // Request Track object from Spotify API
      const track = await axios.get("https://api.spotify.com/v1/tracks/" + id, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          id: id,
        }
        })

      const artists = track.data.artists;

      // Update genres array by requesting Artist object from Spotify API
      const getGenres = async (artist) => {
        const artistObject = await axios.get("https://api.spotify.com/v1/artists/" + artist.id, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          id: artist.id,
        }
        });

        try {
          artistObject.data.genres.forEach((g) => {
            if (!genres.includes(g)) {
              genres.push(g)
            }

            if (!Object.hasOwn(genresObj, g)) {
              genresObj[g] = 1 // Set to 0 initially because React.StrictMode renders components twice
            } else {
              genresObj[g] = genresObj[g] + 1
            }
          });

          setGenresObj({...genresObj}) // Spread syntax ensures the state array is replaced rather than mutated
          setGenres([...genres])
        } catch (e) {
          console.log("No genres found.");
        }
      }
      
      // Update genres array for each artist on the track
      for (const artist of artists) {
        await getGenres(artist);
      }
    }

    console.log(genresObj);
    getTrack();
  }, [])

  return (
    <div class="bg-gray-900 h-full flex-col content-center">
      <NavBar />
      <div class="flex justify-center text-white">
        { genres.length === 0 ?
            <div>No genres found.</div>
            : genres.map(genre => (
              <div class="mx-2">{ genre }</div>
            ))
        }
      </div>
    </div>
  );
}

export default Track;