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

          setgenreObjs([...genreObjs, rankGenres(genreObjs)]) // Spread syntax ensures the state array is replaced rather than mutated
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

  // Ranks genres by occurance
  const rankGenres = (genreObjs) => {
    let array = [].slice.call(genreObjs) // Turn genreObjs argument into array
    array.sort((a, b) => {
      return b.occurs - a.occurs
    })

    let rank = 1;
    for (let i = 0; i < array.length; i++) {
      if (i > 0 && array[i].occurs < array[i - 1].occurs) {
        rank++;
      }
      array[i].rank = rank;
    }

    return array;
  }

  const renderGenres = (genreObjs) => {
    if (genreObjs.length === 0) {
      return (<div></div>)
    }

    return (
      <div class="flex">
        { genreObjs.map(g => (
            <div>
              <h1 class="font-bold text-3xl mx-3">{ g.rank === 1 && g.genre }</h1>
              <h1 class="font-medium text-2xl mx-3">{ g.rank === 2 && g.genre }</h1>
              <h1 class="font-light text-xl mx-3">{ g.rank === 3 && g.genre }</h1>
            </div>
        ))}
      </div>
    );
  }

  return (
    <div class="bg-gray-900 h-full flex-col content-center">
      <NavBar />
      <div class="text-white w-full">
        { renderGenres(genreObjs.filter(genre => genre.rank === 1)) }
        { renderGenres(genreObjs.filter(genre => genre.rank === 2)) }
        { renderGenres(genreObjs.filter(genre => genre.rank === 3)) }
        { /* genres.length === 0 ?
            <div>No genres found.</div>
            : genres.map(genre => (
              <div class="mx-2">{ genre }</div>
            )) */
        }
      </div>
    </div>
  );
}

export default Track;