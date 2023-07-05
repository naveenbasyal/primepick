import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* page not found  */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
