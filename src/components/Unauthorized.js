import React from "react";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import NotAllowed from "../assets/NotAllowed.json";
import "../Styles/common.scss";
const Unauthorized = () => {
  return (
    <div className="not-allowed mulish">
      <Lottie animationData={NotAllowed} />
      <p>You need to LogIn or Register as a Seller</p>
      <div className="d-flex">
        <Link to="/create-shop">Register</Link>
        <Link to="/shop-login">Login</Link>
      </div>
    </div>
  );
};

export default Unauthorized;
