import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../Styles/Navbar.scss";
import { Button } from "@material-ui/core";
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
import { Login } from "@mui/icons-material";

const Navbar = () => {
  const location = useLocation();
  const token = getToken();
  // States ---------------------->
  const [hamburOverlay, setHamBurOverlay] = useState(false);
  const [productOverlay, setProductOverlay] = useState(false);
  const [brandOverlay, setBrandOverlay] = useState(false);
  const [activeLink, setActiveLink] = useState("");
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

  const handleActiveLink = (link) => {
    setActiveLink(link);
  };

  return (
    <header className="container-fluid header">
      <div className={`header-container row ${"position-relative "}`}>
        <div className="navPages-container col-lg-5 ">
          <nav className="navPages">
            <ul className="navPages-list d-flex">
              <li
                className={`navPages-item hamburger center ${
                  hamburOverlay && "bg-hover"
                } `}
                onClick={() => {
                  setHamBurOverlay(!hamburOverlay);
                  setProductOverlay(false);
                  setBrandOverlay(false);
                }}
              >
                <Link>
                  {hamburOverlay ? (
                    <Close className="fs-1" />
                  ) : (
                    <MenuOutlined className="fs-1" />
                  )}
                </Link>
                {/* _______________ Menu Overlay _________ */}
                {hamburOverlay && (
                  <div className="hamburger-overlay position-absolute ${">
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
                                  <Button
                                    variant="outlined"
                                    startIcon={<Login />}
                                    onClick={() => {
                                      localStorage.removeItem("primepick");
                                    }}
                                  >
                                    <Link to="/login" className="m-0 fw-light">
                                      Logout
                                    </Link>
                                  </Button>
                                ) : (
                                  <Link to="/login">
                                    Account SignIn / Sign Up
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
                onClick={() => {
                  setProductOverlay(!productOverlay);
                  setHamBurOverlay(false);
                  setBrandOverlay(false);
                }}
              >
                <Link>
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
                onClick={() => {
                  setBrandOverlay(!brandOverlay);
                  setHamBurOverlay(false);
                  setProductOverlay(false);
                }}
              >
                <Link>
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
        <nav className="navUser col-lg-4">
          <ul className="navUser-section d-flex">
            <li className="navUser-item">
              <Link>
                <Search />
              </Link>
            </li>
            <li className="navUser-item">
              <Link title="Account" className={`link `} to="/dashboard">
                <AccountCircle />
              </Link>
            </li>
            <li className="navUser-item">
              <Link title="Cart" to={token ? "/cart" : "/login"}>
                <ShoppingCart />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
