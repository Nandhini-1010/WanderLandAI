import { useState } from "react";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      console.log("Token Saved");
      console.log(
        "Stored Token:",
        localStorage.getItem("token")
      );
    } catch (error) {
      console.log(
        "ERROR:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div>
      <h1>🌍 WanderLand AI</h1>

      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleLogin}>Login</button>

      <br />
      <br />

      <button
      onClick={() => navigate("/register")}>Create New Account</button>

      <hr />

      <p>Email: {email}</p>
      <p>Password: {password}</p>
    </div>
  );
}

export default App;