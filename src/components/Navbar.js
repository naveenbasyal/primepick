import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../Styles/Navbar.scss";
import { Button } from "@material-ui/core";
import { AccountCircle, ShoppingCart, Store } from "@material-ui/icons";

const Navbar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="nav container-fluid">
      <div className="row">
        <div className="col-md-3 logo">
          <Link title="home" to="/">
            <strong>PrimePick.</strong>
          </Link>
        </div>
        <div className="col-md-4 search">
          <input type="text" placeholder="Search" />
        </div>
        <div className="col-md-4 nav-links">
          <Link
            title="dashboard / account"
            className={`link `}
            to="/dashboard"
            onClick={() => handleLinkClick("/dashboard")}
          >
            <Button
              variant="text"
              className={`${activeLink === "/dashboard" ? "active" : ""}`}
            >
              <AccountCircle />
            </Button>
          </Link>

          <Link
            title="become a seller"
            className={`link `}
            to="/seller"
            onClick={() => handleLinkClick("/seller")}
          >
            <Button
              variant="text"
              className={`${activeLink === "/seller" ? "active" : ""}`}
            >
              <Store />
            </Button>
          </Link>

          <Link
            title="cart"
            className={`link `}
            to="/cart"
            onClick={() => handleLinkClick("/cart")}
          >
            <Button
              variant="text"
              className={`${activeLink === "/cart" ? "active" : ""}`}
            >
              <ShoppingCart />
            </Button>
          </Link>
          {/* Login Register */}
          <Link
            title="Login"
            className="link"
            to="/login"
            onClick={() => handleLinkClick("/login")}
          >
            <Button
              variant={activeLink === "/login" ? "contained" : "outlined"}
              style={{
                border: activeLink === "/login" && "1px solid black",
              }}
            >
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
