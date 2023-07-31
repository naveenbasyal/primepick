import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useFetcher, useLocation } from "react-router-dom";
import "../Styles/Navbar.scss";
import { Button, TextField } from "@material-ui/core";
import {
  AccountCircle,
  ShoppingCart,
  MenuOutlined,
  Category,
  AcUnit,
  Search,
  Close,
} from "@material-ui/icons";
import getToken from "../utils/getToken";
import sellerToken from "../utils/getSellerToken";
import { Login } from "@mui/icons-material";

import { SellerContext } from "../Context/SellerProvider";

const Navbar = () => {
  const { sellerLogin, sellerProfile } = useContext(SellerContext);
  const token = getToken();

  const searchRef = useRef(null);
  // _____________ States __________________
  const [hamburOverlay, setHamBurOverlay] = useState(false);
  const [productOverlay, setProductOverlay] = useState(false);
  const [brandOverlay, setBrandOverlay] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    setHamBurOverlay(false);
    setProductOverlay(false);
    setBrandOverlay(false);
  };

  useEffect(() => {
    if (searchVisible) {
      searchRef.current.focus();
    }
  }, [searchVisible]);

  const [ImgSrc, setImgSrc] = useState([
    "/images/adidas.png",
    "/images/armani.png",
    "/images/benetton.png",
    "/images/calvin.png",
    "/images/diesel.png",
    "/images/fila.png",
    "/images/gucci.png",
    "/images/lacoste.png",
    "/images/levi.png",
  ]);

  return (
    <header className="container-fluid header">
      <div className={`header-container row ${"position-relative "}`}>
        {/* ___________LEFT LINK PART ___________ */}
        <div className="navPages-container col-lg-5 ">
          <nav className="navPages">
            <ul className="navPages-list d-flex">
              <li
                className={`navPages-item hamburger center ${
                  hamburOverlay && "bg-hover"
                } `}
              >
                <Link
                  onClick={() => {
                    setHamBurOverlay(!hamburOverlay);
                    setProductOverlay(false);
                    setBrandOverlay(false);
                  }}
                >
                  {hamburOverlay ? (
                    <Close className="fs-1" />
                  ) : (
                    <MenuOutlined className="fs-1" />
                  )}
                </Link>
                {/* _______________ Menu Overlay _________ */}
                {hamburOverlay && (
                  <div className="hamburger-overlay position-absolute mulish ${">
                    <div className="hamburger-container">
                      <div className="row py-4 px-5 overlay_wrapper">
                        <div className="col-lg-4 leftCol">
                          <div className="hamburger-links px-2">
                            <strong>Discover Prime Picks </strong>
                            <ul>
                              <li>
                                <Link>About Us</Link>
                              </li>
                              <li>
                                <Link>Our Impact</Link>
                              </li>
                              <li>
                                <Link>Our Inspiration</Link>
                              </li>
                              <li>
                                {" "}
                                <Link>Our Future Goals</Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-lg-4 middleCol">
                          <div className="hamburger-links">
                            <ul>
                              <li>
                                <Link>Order Status</Link>
                              </li>
                              <li>
                                <Link>Shipping</Link>
                              </li>
                              <li>
                                <Link>FAQs</Link>
                              </li>
                              <li>
                                <Link>Contact Us</Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-lg-4 rightCol">
                          <div className="hamburger-links">
                            <ul>
                              <li>
                                {token ? (
                                  <Link
                                    to="/login"
                                    className="m-0 fw-bold text-white mulish "
                                  >
                                    <Button
                                      variant="outlined"
                                      startIcon={
                                        <Login style={{ color: "white" }} />
                                      }
                                      className="text-white text-capitalize main-bg-color"
                                      onClick={() => {
                                        localStorage.removeItem("primepick");
                                        setHamBurOverlay(false);
                                      }}
                                    >
                                      Logout
                                    </Button>
                                  </Link>
                                ) : (
                                  <Link
                                    to="/login"
                                    className="m-0 fw-bold text-white mulish "
                                  >
                                    <Button
                                      variant="outlined"
                                      startIcon={
                                        <Login style={{ color: "white" }} />
                                      }
                                      className="text-white text-capitalize main-bg-color"
                                      onClick={() => {
                                        setHamBurOverlay(false);
                                      }}
                                    >
                                      Sign In / Sign Up
                                    </Button>
                                  </Link>
                                )}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li
                className={`navPages-item product center ${
                  productOverlay && "bg-hover"
                } `}
              >
                <Link
                  onClick={() => {
                    setProductOverlay(!productOverlay);
                    setHamBurOverlay(false);
                    setBrandOverlay(false);
                  }}
                >
                  <Category />
                  SHOP BY PRODUCT
                </Link>
                {/* _______________ Product Overlay _________ */}
                {productOverlay && (
                  <div className="product-overlay position-absolute ">
                    <div className="product-container">
                      <div className="row py-4 px-5 overlay_wrapper">
                        <div className="col-lg-4 leftCol">
                          <div className="product-links px-2">
                            <strong>Choose your category </strong>
                            <ul>
                              <li>
                                <Link>Fashion</Link>
                              </li>
                              <li>
                                <Link>Electronics</Link>
                              </li>
                              <li>
                                <Link>Home & Furniture</Link>
                              </li>
                              <li>
                                {" "}
                                <Link>Grocery</Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-lg-4 middleCol">
                          <div className="product-links">
                            <ul>
                              <li>
                                <Link>Beauty Products</Link>
                              </li>
                              <li>
                                <Link>Toys & School Supplies</Link>
                              </li>
                              <li>
                                <Link>Books</Link>
                              </li>
                              <li>
                                <Link>Stationary & Office Supplies</Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-lg-4 rightCol">
                          <div className="product-links">
                            <ul>
                              <li></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li
                className={`navPages-item brand center ${
                  brandOverlay && "bg-hover"
                }`}
              >
                <Link
                  onClick={() => {
                    setBrandOverlay(!brandOverlay);
                    setHamBurOverlay(false);
                    setProductOverlay(false);
                  }}
                >
                  <AcUnit />
                  SHOP BY BRAND
                </Link>
                {/* _______________ Brand Overlay _________ */}

                {brandOverlay && (
                  <div className="brand-overlay position-absolute ">
                    <div className="brand-container">
                      <div className="row py-4 px-5 overlay_wrapper">
                        <div className="brand-link">
                          {ImgSrc.map((item, index) => {
                            return (
                              <Link key={index}>
                                <img
                                  src={item}
                                  alt="brand"
                                  className="img-fluid"
                                />
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </div>
        {/* ___________MIDDLE LOGO PART ___________ */}
        <div className="header-logo col-lg-3">
          <Link
            title="home"
            to="/"
            className="d-flex fw-bold pop fs-5"
            onClick={() => {
              setHamBurOverlay(false);
              setProductOverlay(false);
              setBrandOverlay(false);
            }}
          >
            <img
              src="/logo.png"
              style={{ width: "60px" }}
              alt="logo"
              className="img-fluid me-2 "
            />{" "}
            prime pick
          </Link>
        </div>
        {/* ____________ RIGHT PART ___________ */}
        <nav className="navUser col-lg-4">
          <ul className="navUser-section d-flex">
            <li className="navUser-item">
              {searchVisible && (
                <div className="search-bar">
                  <TextField
                    inputRef={searchRef}
                    label="Search"
                    variant="standard"
                    className="search-input"
                    size="small"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
              )}
              <Link onClick={toggleSearch}>
                <Search />
              </Link>
            </li>
            <li
              className="navUser-item"
              onClick={() => {
                setHamBurOverlay(false);
                setProductOverlay(false);
                setBrandOverlay(false);
                localStorage.setItem(
                  "primepick-currentTab",
                  "Personal Information"
                );
              }}
            >
              <Link title="Account" className={`link `} to="/dashboard">
                <AccountCircle />
              </Link>
            </li>
            <li className="navUser-item">
              <Link title="Cart" to={token ? "/cart" : "/login"}>
                <ShoppingCart />
              </Link>
            </li>
            {sellerLogin && sellerProfile.logo ? (
              <li className="navUser-item">
                <Link
                  title="Shop "
                  to="/shop"
                  onClick={() => {
                    localStorage.setItem("currentPage", "dashboard");
                  }}
                  className="image_container_shop"
                >
                  <img
                    src={sellerProfile.logo}
                    className="shop_logo_navbar"
                    loading="lazy"
                  />
                </Link>
              </li>
            ) : (
              <li className="navUser-item">
                <Link
                  title="Become a seller"
                  className="main-bg-color text-white p-2"
                  to={"/shop-login"}
                  style={{ borderRadius: "3px" }}
                >
                  Become a seller
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
