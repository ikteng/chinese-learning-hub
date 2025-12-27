import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ user, setUser }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); // clear user
    localStorage.removeItem("user"); // remove persisted user
    setMenuOpen(false);
    navigate("/login"); // redirect to login
  };

  return (
    <nav className="navbar">
      <div className="logo">Learning Platform</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/pronunciation">Pronunciation</Link></li>
        <li className="user-menu-container">
          {user ? (
            <>
              <button
                className="user-button"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {user.name} ▾
              </button>
              {menuOpen && (
                <div className="dropdown-menu">
                  <Link to="/settings" className="dropdown-item" onClick={() => setMenuOpen(false)}>
                    Settings
                  </Link>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
