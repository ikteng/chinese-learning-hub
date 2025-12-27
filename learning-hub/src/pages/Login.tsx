import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserApi } from "../api/UserApi";
import "./Login.css";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await UserApi.login({ email, password });

      const data = await res.data;
      console.log(data)

      if (!data.ok) {
        setError(data.error);
      } else {
        // Login successful: redirect or save token
        setUser(data.user); // store user info globally
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("jwt", data.token || "");
        navigate("/"); // redirect to home or dashboard
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="login-page-wrapper">
        <div className="login-container">
          <h1 className="login-title">Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                className="login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="login-button">Log In</button>
            </form>
            
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
          <p className="signup-text">
            Don’t have an account? <Link to="/signup" className="signup-link">Sign up now!</Link>
          </p>
      </div>
    </div>
    
  );
}
