import axios from "axios";
import { useParams } from "react-router-dom";
import React, {useState, useEffect} from "react";
import NavBar from "../NavBar";

const Track = () => {
  const token = window.localStorage.getItem("token");
  const { id } = useParams();
  const [genres, setGenres] = useState([]);

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
          });
          setGenres([...genres]) // Spread syntax ensures the state array is replaced rather than mutated
        } catch (e) {
          console.log("No genres found.");
        }
      }
      
      // Update genres array for each artist on the track
      for (const artist of artists) {
        await getGenres(artist);
      }
    }

    getTrack();
  }, [])

  if (genres.length === 0) {
    return (
      <div class="bg-gray-900 h-full flex-col content-center text-white">
        <NavBar />
        <div>No genres found.</div>
      </div>
    );
  }

  return (
    <div class="bg-gray-900 h-full flex-col content-center">
      <NavBar />
      <div class="text-white">
        { genres.length === 0 ?
            <div>No genres found.</div>
            : genres.map(genre => (
              <div>
                <h2>{ genre }</h2>
              </div>
            ))
        }
      </div>
    </div>
  );
}

export default Track;