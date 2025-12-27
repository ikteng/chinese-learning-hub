import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserApi } from "../api/UserApi";
import "./Login.css";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();

      setError("");

      try {
        const res = await UserApi.signup({ username, email, password });
        const data = res.data;

        if (!data.ok) {
          setError(data.error);
        } else {
          // Redirect to login after successful signup
          navigate("/login");
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
        console.error(err);
      }
    };

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <h1 className="login-title">Sign Up</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

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

          <button type="submit" className="login-button">Sign Up</button>
        </form>

        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

        <p className="signup-text">
          Already have an account? <Link to="/login" className="signup-link">Log in here</Link>
        </p>
      </div>
    </div>
    
  );
}
