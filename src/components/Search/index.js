import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const token = window.localStorage.getItem("token");
  const [searchKey, setSearchKey] = useState("");
  const [tracks, setTracks] = useState([]);
  const [track, setTrack] = useState({});
  const [genres, setGenres] = useState([]);
  const [genreObjs, setGenreObjs] = useState([]);// Counts the occurances of each genre
  const navigate = useNavigate();

  const searchTracks = async (e) => {
    e.preventDefault();
    const {data} = await axios.get("https://api.spotify.com/v1/search/", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: searchKey,
        type: "track",
        limit: 10 
      }
    });

    setTracks(data.tracks.items)
  }

  const navAndRefresh = (trackId) => {
    navigate("../track/" + trackId)
    navigate(0)
  }

  // Gets a track with the provided track ID
  const getTrack = async (trackObj) => {
    // Request Track object from Spotify API
    const trackResponse = await axios.get("https://api.spotify.com/v1/tracks/" + trackObj.id, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const artists = trackResponse.data.artists;
    let artistIDs = "";

    // Create a comma-separated list of Spotify IDs for artists
    for (const artist of artists) {
      artistIDs += artist.id + ","
    }
    artistIDs = artistIDs.substring(0, artistIDs.length - 1) // Remove extra comma

    // Update genres array for each artist on the track
    await getGenres(artistIDs)

    // Update genres array for each artist on the track
    // for (const artist of artists) {
      // await getGenres(artist);
    // }

    setTracks([])
    setTrack(trackObj)
  }

  // Update genres array by requesting Artist object from Spotify API
  const getGenres = async (artistIDs) => {
    const artistObjects = await axios.get("https://api.spotify.com/v1/artists/", {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      ids: artistIDs
    },
    timeout: 30000
    })
      .catch(function (error) {
        console.log(error);
      });

    console.log(artistObjects);
    try {
      // Add the genres of each artist into the genres array
      artistObjects.data.artists.forEach((a) => {
        a.genres.forEach((g) => {
          genres.push(g)
        });
      });

      // Count the occurances of each genre and stores into the genreObjs array
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

      setGenreObjs([...genreObjs, rankGenres(genreObjs)]) // Spread syntax ensures the state array is replaced rather than mutated
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

  const renderTracks = () => {
    return (
      <div class="w-full">
        <div class="flex justify-start items-center text-white border-b-2 border-gray-700 p-3 m-5 mx-10">
          <div class="min-w-[64px]"></div>
          <p class="w-6/12 mx-5">Title</p>
          <p class="w-4/12 mx-5">Album</p>
        </div>
        {tracks.map(track => (
          // <div onClick={() => navAndRefresh(track.id)} class="flex justify-start items-center text-white rounded-lg p-3 m-5 mx-10 hover:bg-gray-700 cursor-pointer" key={track.id}>
          <div onClick={() => getTrack(track)} class="flex justify-start items-center text-white rounded-lg p-3 m-5 mx-10 hover:bg-gray-700 cursor-pointer" key={track.id}>
            {track.album.images.length ? 
              <div class="min-w-[64px]">
                <img src={track.album.images[2].url} alt="" class="overflow-hidden rounded-lg"/> 
              </div>
              : <div>No Image</div>}
            <p class="w-6/12 mx-5">"{track.name}" by {renderArtists(track)}</p>
            <p class="w-4/12 mx-5">{track.album.name}</p>
          </div>
        ))};
      </div>
    );
  }

  const renderArtists = (track) => {
    let artistStr = "";
    let i = 0;
    while (typeof(track.artists[i]) != "undefined") {
      artistStr += track.artists[i].name;
      i += 1
      if (typeof(track.artists[i]) != "undefined") {
        artistStr += " \u2022 "
      }
    }
    return artistStr;
  }

  return (
    <div>
      <div class="flex justify-center items-center">
        {token ?
          <form class="flex justify-center items-center my-5 w-screen" onSubmit={searchTracks}>
            <input class="h-15 w-6/12 border rounded-lg p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white" type="text" placeholder="Search track..." onChange={e => setSearchKey(e.target.value)}></input>
            {searchKey ? 
              <button class="bg-green-500 text-white font-medium py-2 px-4 m-5 rounded" type={"submit"}>Search</button>
              : <button disabled title="Enter a track name before searching." class="bg-green-400 text-white font-medium py-2 px-4 m-5 rounded" type={"submit"}>Search</button>
            }
            
          </form>
        
          : <h1 class="text-white font-medium text-3xl my-5">Please login</h1>
        }
      </div>

      {tracks.length ? 
        <div class="flex-grow">
          {renderTracks()}
        </div>
        : <div class="flex-auto"></div>
      }

      { Object.keys(track).length ? 
          renderTrack(track) 
          : <div class="text-white">Track not rendered.</div>
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

export default Search;