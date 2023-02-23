import './App.css';

import useSWRMutation from "swr/mutation";
import { useState } from "react";
import axios from 'axios';

async function submitLoginDetails(url, { arg: data }) {
  console.log({ data })
  return axios.post(url, { username: data.username, password: data.password },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    });
}

function App() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const HOST = "BASE_URL";

  const { trigger, isMutating, data: loginResponse, error: loginError, reset } = useSWRMutation(
    HOST + "/passwordLogin",
    submitLoginDetails,
    [username, password]
  );

  function login() {
    reset()
    trigger({ username, password });
  }

  return (
    <div className="App">

      <h1>Login Sample</h1>
      {/* Login Form */}
      <div>
        <label>Username</label>
        <input type="email" onChange={(e) => setUsername(e.target.value)} />
        <br></br>
        <label>Password</label>
        <input type="text" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={() => login()}>Login</button>
      {/* End of Login Form */}

      {/* Display Loading status */}
      {isMutating ? <p>Loging in...</p> : null}


      <h3>Login Response</h3>
      <p>
        <code>
          {JSON.stringify(loginResponse)}
        </code>
      </p>

      <h3>Error</h3>
      <p>
        <span>{JSON.stringify(loginError)}</span>
      </p>
    </div>
  );
}

export default App;
