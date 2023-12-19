import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import { UserContext } from "./Context/UserContext";

function App() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const base_url = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    // when the user first loads the app, we want to check if they are logged in
    // if they are logged in, we want to redirect them to the login page

    // check if the user is logged in
    axios
      .get(`${base_url}/api/auth/currentUser`, { withCredentials: true })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        // if the user is not logged in, redirect them to the login page
        navigate("/login");
      });
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
