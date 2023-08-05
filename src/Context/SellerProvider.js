import { createContext, useEffect, useState } from "react";
// ________ Token __________
import getSellerToken from "../utils/getSellerToken";
import { decodeToken } from "react-jwt";
import axios from "axios";

const SellerContext = createContext();

const SellerProvider = ({ children }) => {
  const [sellerLogin, setSellerLogin] = useState(
    localStorage.getItem("primepick-seller") ? true : false
  );
  // all seller related data
  const [sellerProfile, setSellerProfile] = useState([]);
  const [sellerProducts, setSellerProducts] = useState([]);
  // _________ Loading State ___________
  const [loading, setLoading] = useState({
    sellerDataLoading: false,
    sellerDetailsLoading: false,
  });
  useEffect(() => {
    if (sellerLogin) {
      getSellerData();
      getSellerProducts();
    }
  }, []);
  //  _________________ Get Seller Data _________________
  const getSellerData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("primepick-seller")
          )}`,
        },
      };
      setLoading({
        ...loading,
        sellerDataLoading: true,
      });
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}api/store/`,
        config
      );
      const userData = res.data.data;
      setLoading({
        ...loading,
        sellerDataLoading: false,
      });
      setSellerProfile(userData);
    } catch (err) {
      console.log(err.response);
      setLoading({
        ...loading,
        sellerDataLoading: false,
      });
    }
  };
  // __________________ Get Seller Products ______________
  const getSellerProducts = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("primepick-seller")
          )}`,
        },
      };
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}api/store/products/`,
        config
      );
      const products = res.data.data;
      setSellerProducts(products);
    } catch (err) {
      console.log(err.response);
    }
  };
  return (
    <SellerContext.Provider
      value={{
        getSellerData,
        sellerProfile,
        setLoading,
        loading,
        setSellerProfile,
        sellerProducts,
        setSellerProducts,
        sellerLogin,
        setSellerLogin,
        getSellerProducts,
      }}
    >
      {children}
    </SellerContext.Provider>
  );
};

export { SellerContext, SellerProvider };
