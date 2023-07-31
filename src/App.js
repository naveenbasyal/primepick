import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import VerifyEmail from "./Pages/VerifyEmail";
// __________Seller Imports _____________
import SellerRegister from "./components/Seller/Register";
import SellerLogin from "./components/Seller/Login";
import Shop from "./Pages/Shop";
// ______________________________________
import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./Pages/Cart";
import { Toaster } from "react-hot-toast";
import StoreVerifyEmail from "./Pages/StoreVerifyEmail";
import ProductPreview from "./Pages/ProductPreview";

const App = () => {
  return (
    <>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* _________ User Dashboard _______ */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute Component={Dashboard} />}
        />
        {/* _________ Cart _______ */}
        <Route path="/cart" element={<ProtectedRoute Component={Cart} />} />

        {/* __________ Become a Seller ___________*/}
        <Route path="/create-shop" element={<SellerRegister />} />
        <Route path="/shop-login" element={<SellerLogin />} />

        {/* ___________ SHOP ___________ */}
        <Route path="/shop" element={<Shop />} />
    
        {/* _________Product Preview __________ */}

        <Route path="/product/:productName/:productId" element={<ProductPreview />} />

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
        <Route path="/auth/verifyemail/" element={<VerifyEmail />} />
        <Route
          path="/auth/store/verifyemail/:token"
          element={<StoreVerifyEmail />}
        />
      </Routes>
    </>
  );
};

export default App;
