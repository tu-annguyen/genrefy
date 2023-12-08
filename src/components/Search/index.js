import axios from 'axios';
import {useEffect, useState} from 'react';

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
        q: searchKey, // Todo: Check for empty searchKey 
        type: "track"
      }
    })

    setTracks(data.tracks.items)
  }

  const renderTracks = () => {
    return tracks.map(track => (
      <div class="text-white" key={track.id}>
        {track.name}
      </div>
    ))
  }
  
  return (
    <div>
      {token ?
        <form class="my-5" onSubmit={searchTracks}>
          <input class="w-6/12 border rounded-lg p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white" type="text" placeholder="Search track..." onChange={e => setSearchKey(e.target.value)}></input>
          {searchKey ? 
            <button class="bg-green-500 text-white font-medium py-2 px-4 m-5 rounded" type={"submit"}>Search</button>
            : <button disabled title="Enter a track name before searching." class="bg-green-400 text-white font-medium py-2 px-4 m-5 rounded" type={"submit"}>Search</button>
          }
          
        </form>
      
        : <h2 class="text-white font-medium">Please login</h2>
      }

      {renderTracks()}
    </div>
  );
}

export default Search;