import {useEffect, useState} from 'react';

const Login = () => {
  const CLIENT_ID = "23e66581edf14c5f848e77f3976e8e19";
  const REDIRECT_URI = "https://genrefy.app";
  // const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
      window.location.reload()
    }
    
    setToken(token)
  }, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
    window.location.href = "/"
  }

  return (
    <div>
        {!token ? 
            <a class="bg-green-500 text-white font-medium py-2 px-4 my-5 rounded" href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
            : <button class="bg-green-500 text-white font-medium py-2 px-4 rounded" onClick={logout}>Logout</button>}
    </div>
  );

}

export default Login