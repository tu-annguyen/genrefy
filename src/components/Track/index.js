import axios from "axios";
import { useParams } from "react-router-dom";
import React, {useState, useEffect} from "react";
import NavBar from "../NavBar";

const Track = () => {
  const token = window.localStorage.getItem("token");
  const { id } = useParams();
  // let genres = [];
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
      const tempGenres = genres

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
              tempGenres.push(g)
            }
          });
          setGenres(tempGenres)
        } catch (e) {
          console.log("No genres found.");
        }
      }
      
      // Update genres array for each artist on the track
      for (const artist of artists) {
        await getGenres(artist);
      }
    }
    console.log(genres);

    getTrack();
  }, [])
  

    /*
        .then(response => {
          const artists = response.data.artists;

          artists.forEach((artist) => {
            axios.get("https://api.spotify.com/v1/artists/" + artist.id, {
            headers: {
              Authorization: `Bearer ${token}`
            },
            params: {
              id: artist.id,
            }
            })
              .then(response => {
                const artistObject = response.data;
                artistObject.genres.forEach((g) => genres.push(g));
              })
              .catch(err => {
                console.error(err);
              });
          })
        })
        .catch(err => {
          console.error(err);
        });

    console.log(track);
    const artists = track.artists;

    artists.forEach((artist) => {
      const { artistObject } = axios.get("https://api.spotify.com/v1/artists/" + artist.id, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        id: artist.id,
      }
      });

      try {
        artistObject.genres.forEach((g) => genres.push(g));
      } catch (e) {
        console.log("No genres found.");
      }
    })

    for (let i = 0; i < data.artists.length; i++) {
      try {
        data.artists.genres.forEach((g) => genres.push(g));
      } catch (e) {
        console.log("No genres found.");
      }
    }
    */

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