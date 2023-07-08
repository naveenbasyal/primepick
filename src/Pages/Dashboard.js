import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Dashboard.scss";
import { Button, InputAdornment, TextField } from "@material-ui/core";
import { BiotechRounded, Person2Rounded } from "@mui/icons-material";
import { MailOutline } from "@material-ui/icons";
const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState("Personal Information");

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };
  return (
    <>
      <nav className="dash-nav">
        <ul className="dash-nav-list">
          <li
            className={`dash-nav-item ${
              currentTab === "Personal Information" && "dash-tab-active"
            }`}
          >
            <Link
              className={`dash-nav-link `}
              onClick={() => handleTabChange("Personal Information")}
            >
              Personal Information
            </Link>
          </li>
          <li
            className={`dash-nav-link ${
              currentTab === "Address Book" && "dash-tab-active"
            }`}
          >
            <Link onClick={() => handleTabChange("Address Book")}>
              Address Book
            </Link>
          </li>
          <li
            className={`dash-nav-item ${
              currentTab === "My Orders" && "dash-tab-active"
            }`}
          >
            <Link onClick={() => handleTabChange("My Orders")}>My Orders</Link>
          </li>
          <li
            className={`dash-nav-item ${
              currentTab === "My WishList" && "dash-tab-active"
            } `}
          >
            <Link onClick={() => handleTabChange("My WishList")}>
              My Wishlists
            </Link>
          </li>
        </ul>
      </nav>
      {/*  ________ Personal Information __________ */}
      {currentTab === "Personal Information" && (
        <div className="dash-tab-content container mt-5">
          <div className="dash-tab-content-header row justify-content-center">
            <div className="dash-tab-content-body col-lg-8 col-sm-12">
              {/* ___________________ NAME FIELD __________________ */}
              <div className="name mb-5">
                <div className="name-header d-flex align-items-center">
                  <h5>Name</h5>
                  <Button variant="text">Edit</Button>
                </div>
                <TextField
                  // onChange={formik.handleChange}
                  id="outlined-basic"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person2Rounded className="mail__icon" />
                      </InputAdornment>
                    ),
                  }}
                  label="Name"
                  variant="filled"
                  // value={formik.values.username}
                  type="text"
                  name="username"
                  placeholder="Name"
                  className="form-control "
                />
              </div>
              {/* ___________________ EMAIL FIELD __________________ */}
              <div className="email mb-5">
                <div className="email-header d-flex align-items-center">
                  <h5>Email Address</h5>
                  <Button variant="text">Edit</Button>
                </div>
                <TextField
                  // onChange={formik.handleChange}
                  id="outlined-basic"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutline className="mail__icon" />
                      </InputAdornment>
                    ),
                  }}
                  label="Email"
                  variant="filled"
                  // value={formik.values.username}
                  type="text"
                  name="email"
                  placeholder="Email Address"
                  className="form-control "
                />
              </div>
              {/* ___________________ BIO FIELD __________________ */}
              <div className="bio">
                <div className="bio-header d-flex align-items-center">
                  <h5>Bio Address</h5>
                  <Button variant="text">Edit</Button>
                </div>
                <TextField
                  // onChange={formik.handleChange}
                  id="outlined-basic"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BiotechRounded className="mail__icon" />
                      </InputAdornment>
                    ),
                  }}
                  label="Bio"
                  variant="filled"
                  // value={formik.values.username}
                  type="text"
                  name="bio"
                  placeholder="Bio"
                  className="form-control "
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/*  ________ Address Book __________ */}
      {currentTab === "Address Book" && (
        <div className="address-tab-content container mt-5">Addresses</div>
      )}

      {/*  ________ My Orders __________ */}
      {currentTab === "My Orders" && (
        <div className="orders-tab-content container mt-5">Orders</div>
      )}

      {/*  ________ My Reviews __________ */}
      {currentTab === "My Wishlist" && (
        <div className="reviews-tab-content container mt-5">WishList Items</div>
      )}
    </>
  );
};

export default Dashboard;
