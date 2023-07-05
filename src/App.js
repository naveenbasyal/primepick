import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import ForgotPassword from "./components/ForgotPassword";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* ____Auth____ */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ____Page not found____  */}
        <Route path="*" element={<NotFound />} />

        {/* ____Forgot Page____ */}
          <Route path="/forgotpassword" element={<ForgotPassword/>}/>
      </Routes>
    </>
  );
};

export default App;
