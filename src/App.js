import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [registerName, setRegisterName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState(null);

  const register = () => {
    axios({
      method: "post",
      data: {
        userName: registerName,
        password: registerPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/register",
    }).then((res) => console.log(res));
  };

  const login = () => {
    axios({
      method: "POST",
      data: {
        userName: loginName,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/login",
    }).then((res) => console.log(res));
  };

  const getUser = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/user",
    }).then((res) => {
      console.log(res.data);
      return setData(res.data);
    });
  };

  return (
    <div className="App">
      <div>
        <h1>Registration</h1>
        <input
          placeholder="Name"
          value={registerName}
          onChange={(e) => setRegisterName(e.target.value)}
        />
        <input
          placeholder="Password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <button onClick={register}>Send</button>
      </div>

      <div>
        <h1>Login</h1>
        <input
          placeholder="Name"
          value={loginName}
          onChange={(e) => setLoginName(e.target.value)}
        />
        <input
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button onClick={login}>Send</button>
      </div>

      <div>
        <h2>Get user</h2>
        <button onClick={getUser}>Submit</button>
        {data ? <h1>Welcome back, {data.userName}</h1> : null}
      </div>
    </div>
  );
}

export default App;
