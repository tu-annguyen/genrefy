import axios from "axios";
import { useParams } from "react-router-dom";
import React, {useState, useEffect} from "react";
import NavBar from "../NavBar";
import Search from "../Search";

const Track = () => {
  const token = window.localStorage.getItem("token");
  const { id } = useParams();
  const [track, setTrack] = useState({});
  const [genres, setGenres] = useState([]);
  const [genreObjs, setgenreObjs] = useState([]);// Counts the occurances of each genre

  // ***FIX THIS*** Runs too much
  useEffect(() => {
    getTrack();  
  }, [])

  // Update track for every new track searched
  useEffect(() => {
    setTrack(track);
  }, [track])

  // Gets a track with the provided track ID
  const getTrack = async () => {
    // Request Track object from Spotify API
    const trackObject = await axios.get("https://api.spotify.com/v1/tracks/" + id, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        id: id,
      }
      })

    const artists = trackObject.data.artists;

    // Update genres array for each artist on the track
    for (const artist of artists) {
      await getGenres(artist);
    }

    setTrack(trackObject.data)
  }
    
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

  // Renders genres by rank
  const renderGenres = (genreObjs, rank) => {
    if (genreObjs.length === 0) {
      return (<div></div>)
    }

    if (rank === 1) {
      return (
        <div class="flex my-2">
          { genreObjs.map(g => (
              <h1 class="font-bold text-3xl mx-3">{ g.genre }</h1>
          ))}
        </div>
      );
    } else if (rank === 2) {
      return (
        <div class="flex my-2">
          { genreObjs.map(g => (
              <h2 class="font-medium text-2xl mx-3">{ g.genre }</h2>
          ))}
        </div>
      );
    } else if (rank === 3) {
      return (
        <div class="flex my-2">
          { genreObjs.map(g => (
              <h3 class="font-regular text-xl mx-3">{ g.genre }</h3>
          ))}
        </div>
      );
    } else {
      return (
        <div class="flex my-2">
          { genreObjs.map(g => (
              <h1 class="font-light text-lg mx-3">{ g.genre }</h1>
          ))}
        </div>
      );
    }
  }

  // Render track
  const renderTrack = (trackObject) => {
    return (
      <div class="flex text-white">
        <div class="mx-5">
          { trackObject.album.images.length ? 
            <div class="min-w-full">
              <img src={trackObject.album.images[1].url} alt="" class="overflow-hidden rounded-lg"/> 
            </div>
            : <div>No Image</div> }
        </div>

        <div class="flex-col justify-end h-300">
          <div class="text-4xl font-bold flex-none">
            { trackObject.name }
          </div>
          <div class="text-lg flex-none">
            <div class="flex">
              <h2 class="font-semibold"> { renderArtists(trackObject) } </h2>
              <h2 class="ml-1"> { trackObject.album.release_date.slice(0, 4) } </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderArtists = (track) => {
    let artistStr = "";
    for (const i in track.artists) {
      artistStr += track.artists[i].name + " \u2022 "
    }
    return artistStr;
  }

  return (
    <div class="bg-gray-900 h-full flex-col content-center">
      <NavBar />
      <Search />

      { console.log(track) }
      { Object.keys(track).length ? 
          renderTrack(track) 
          : <div>Track not rendered.</div>
      }
      <div class="text-white w-full mx-5 my-5">
        { renderGenres(genreObjs.filter(genre => genre.rank === 1), 1) }
        { renderGenres(genreObjs.filter(genre => genre.rank === 2), 2) }
        { renderGenres(genreObjs.filter(genre => genre.rank === 3), 3) }
        { renderGenres(genreObjs.filter(genre => genre.rank !== 1 && genre.rank !== 2 && genre.rank !== 3), 4) }
      </div>
    </div>
  );
}

export default Track;