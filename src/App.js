import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import VerifyEmail from "./Pages/VerifyEmail";

import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./Pages/Cart";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute Component={Dashboard} />}
        />
        <Route path="/cart" element={<ProtectedRoute Component={Cart} />} />
        {/* ____Auth____ */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ____Page not found____  */}
        <Route path="*" element={<NotFound />} />

        {/* ____Forgot Page____ */}
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        {/* ____Reset Password Page____ */}
        <Route path="/resetpassword" element={<ResetPassword />} />

        {/* ____Verify Email____ */}
        <Route path="/auth/verifyemail/:token" element={<VerifyEmail />} />
      </Routes>
    </>
  );
};

export default App;
