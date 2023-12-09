import axios from 'axios';
import { useEffect, useState } from 'react';

const Search = () => {
  let token = window.localStorage.getItem("token");
  const [searchKey, setSearchKey] = useState("");
  const [tracks, setTracks] = useState([]);

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

  const renderTracks = () => {
    return (
      <div class="w-full">
        <div class="flex justify-start items-center text-white border-b-2 border-gray-700 p-3 m-5 mx-10">
          <div class="min-w-[64px]"></div>
          <p class="w-6/12 mx-5">Title</p>
          <p class="w-4/12 mx-5">Album</p>
        </div>
        {tracks.map(track => (
          <div class="flex justify-start items-center text-white rounded-lg p-3 m-5 mx-10 hover:bg-gray-700" key={track.id}>
            {track.album.images.length ? 
              <div class="min-w-[64px]">
                <img src={track.album.images[2].url} alt="" class="overflow-hidden rounded-lg"/> 
              </div>
              : <div>No Image</div>}
            <p class="w-6/12 mx-5">"{track.name}" by {renderArtists(track.artists)}</p>
            <p class="w-4/12 mx-5">{track.album.name}</p>
          </div>
        ))};
      </div>
    );
  }

  const renderArtists = (artists) => {
    let artistsStr = ""
    for (let i = 0; i < artists.length - 1; i++) {
      artistsStr += artists[i].name + ", ";
    }
    artistsStr += artists[artists.length - 1].name;

    return artistsStr
  }
  
  return (
    <div>
      {token ?
        <form class="flex justify-center items-center my-5" onSubmit={searchTracks}>
          <input class="h-15 w-6/12 border rounded-lg p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white" type="text" placeholder="Search track..." onChange={e => setSearchKey(e.target.value)}></input>
          {searchKey ? 
            <button class="bg-green-500 text-white font-medium py-2 px-4 m-5 rounded" type={"submit"}>Search</button>
            : <button disabled title="Enter a track name before searching." class="bg-green-400 text-white font-medium py-2 px-4 m-5 rounded" type={"submit"}>Search</button>
          }
          
        </form>
      
        : <h1 class="text-white font-medium text-3xl my-5">Please login</h1>
      }

      {tracks.length ? 
        <div class="h-screen">
          {renderTracks()}
        </div>
        : <div class="h-screen"></div>
      }
    </div>
  );
}

export default Search;