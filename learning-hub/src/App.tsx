import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Pronunciation from "./pages/Pronunciation";
import { useState } from "react";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  }); // store logged-in user

  return (
    <Router>
      <div className="app">
        <Navbar user={user} setUser={setUser} /> {/* navbar always on top */}
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/pronunciation" element={<Pronunciation/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
