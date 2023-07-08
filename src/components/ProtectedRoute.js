import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getToken from "../utils/getToken";
import { decodeToken } from "react-jwt";

const ProtectedRoute = (props) => {
  const { Component } = props;

  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      let token = getToken();

      if (token) {
        const decodedToken = decodeToken(token);
        
        setLoggedIn(true);
      } else {
        navigate("/login");
      }
    };

    checkToken();
  }, [navigate]);

  return loggedIn ? <Component /> : null;
};

export default ProtectedRoute;
