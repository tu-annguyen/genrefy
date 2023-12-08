import axios from 'axios';
import {useEffect, useState} from 'react';

const TextBox = () => {
  let token = window.localStorage.getItem("token");
  const [searchKey, setSearchKey] = useState("");

  const searchSong = async (e) => {
    // e.preventDefault();
    const {data} = await axios.get("https://api.spotify.com/v1/tracks/", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        id: searchKey, // Todo: clean URL for Spotify ID
      }
    })
  }
  
  return (
    <div>
      {token ?
        <form class="my-5">
          <input class="w-6/12 border rounded-lg p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white" type="url" placeholder="https://open.spotify.com/track/..." onChange={e => setSearchKey(e.target.value)}></input>
          <button class="bg-green-500 text-white font-medium py-2 px-4 m-5 rounded" type={"submit"}>Search</button>
        </form>
      
        : <h2 class="text-white font-medium">Please login</h2>
      }
    </div>
  );
}

export default TextBox;