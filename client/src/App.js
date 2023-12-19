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
import AddProblem from "./Pages/AddProblem";
import Layout from "./Components/Layout";
import UpdateProblem from "./Pages/UpdateProblem";
import SolveProblem from "./Pages/SolveProblem";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/addProblem" element={<AddProblem />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/update/:id" element={<UpdateProblem />} />
          <Route path="/solveProblem/:id" element={<SolveProblem />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
