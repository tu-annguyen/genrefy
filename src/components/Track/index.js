import axios from "axios";
import { useParams } from "react-router-dom";
import React, {useState, useEffect} from "react";
import NavBar from "../NavBar";

const Track = () => {
  const token = window.localStorage.getItem("token");
  const { id } = useParams();
  const [genres, setGenres] = useState([]);
  const [genreObjs, setgenreObjs] = useState([]);// Counts the occurances of each genre

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
            if (true || !genres.includes(g)) {
              genres.push(g)
            }

            // if (!Object.hasOwn(genreObjs, g)) {
              // genreObjs[g] = 1
            // } else {
              // genreObjs[g] = genreObjs[g] + 1
            // }
          });

          for (let i = 0; i < genres.length; i++) {
            let objIndex = genreObjs.findIndex(g => g.genre === genres[i]);
            if (objIndex > -1) {
              // Increment occurances in existing genre
              genreObjs[objIndex] = {
                genre: genres[i], 
                occurs: genreObjs[objIndex].occurs + 1
              }
            } else {
              genreObjs.push({
                genre: genres[i],
                occurs: 1
              })
            }
          }

          setgenreObjs({...genreObjs}) // Spread syntax ensures the state array is replaced rather than mutated
          setGenres([...genres])
        } catch (e) {
          console.error(e);
        }
      }
      
      // Update genres array for each artist on the track
      for (const artist of artists) {
        await getGenres(artist);
      }
    }

    console.log(genreObjs);
    getTrack();  
  }, [])

  const rankGenres = (genresObj) => {
    let genresObjArr = [];

    for (let genre in genresObj) {
      genresObjArr.push({
        genre: genre,
        occurances: genresObj[genre]
      })
    }

    return genresObjArr 

    genresObjArr.sort(function(a, b) {
      return b.score - a.score
    })

    let rank = 1;
    for (let i = 0; i < genresObjArr.length; i++) {
      if (i > 0 && genresObjArr[i].score < genresObjArr[i - 1].score) {
        rank++;
      }
      genresObjArr[i].rank = rank;
    }

    return genresObjArr 
  }

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