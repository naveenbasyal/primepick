import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Dashboard.scss";
import {
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { Add, BiotechRounded, Person2Rounded } from "@mui/icons-material";
import { MailOutline, SupervisedUserCircle } from "@material-ui/icons";
import getToken from "../utils/getToken";
import { decodeToken } from "react-jwt";
import Lottie from "lottie-react";
import Loading from "../assets/loading.json";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const Dashboard = () => {
  const token = getToken();

  const decodedToken = decodeToken(token);

  // ________________________ STATES ________________________
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("primepick-user"))
  );
  const [currentTab, setCurrentTab] = useState(
    localStorage.getItem("primepick-currentTab") || "Personal Information"
  );
  const [toggleEdit, setToggleEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    localStorage.setItem("primepick-currentTab", tab);
  };
  // ___________________ USE EFFECT ________________________

  useEffect(() => {
    const getUserData = async () => {
      try {
        const cachedUserData = JSON.parse(
          localStorage.getItem("primepick-user")
        );
        if (cachedUserData) {
          setUser(cachedUserData);
        } else {
          const config = {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          };
          const res = await axios.get(
            `https://primepick.onrender.com/api/user/${decodedToken.id}`,
            config
          );
          const userData = res.data.data;
          setUser(userData);
          console.log(user);
          localStorage.setItem("primepick-user", JSON.stringify(userData));
        }
      } catch (err) {
        console.log(err.response);
      }
    };

    if (decodedToken && decodedToken.id && !user) {
      getUserData();
    }
  }, [decodedToken, user]);

  // ________________________ EDIT USER ________________________
  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      setLoading(true);
      console.log("User object:", user);
      const res = await axios.put(
        `https://primepick.onrender.com/api/user/editprofile`,
        user,
        config
      );
      console.log("Response data:", res.data);
      setUser(res.data.data);
      setLoading(false);
      setToggleEdit(false);
      toast.success("Profile Updated Successfully");
      localStorage.setItem("primepick-user", JSON.stringify(res.data.data));
    } catch (err) {
      console.log("Error response:", err.response.data);
      setLoading(false);
      setToggleEdit(false);
      toast.error("Something went wrong");
    }
  };

  if (!user) {
    return (
      <>
        <div className="container center mt-5">
          <Lottie animationData={Loading} className="verify centerall" />
        </div>
      </>
    );
  }

  const addressListGridTemplateColumns = {
    lg: "repeat(3, 1fr)",
    md: "repeat(2, 1fr)",
    sm: "repeat(1, 1fr)",
  };

  const getAddressListGridTemplateColumns = (breakpoint) => {
    return addressListGridTemplateColumns[breakpoint];
  };
  return (
    <>
      <Toaster />
      {console.log(user)}
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
        <div className="dash-tab-content container my-5">
          <div className="dash-tab-content-header row justify-content-center">
            <div className="dash-tab-content-body col-lg-8 col-sm-12">
              <form onSubmit={handleEditUser}>
                {/* ___________________ NAME FIELD __________________ */}
                <div className="name mb-5">
                  <div className="name-header d-flex align-items-center">
                    <h5>Name</h5>
                    <Button
                      variant={toggleEdit ? "outlined" : "text"}
                      onClick={() => setToggleEdit(!toggleEdit)}
                    >
                      {toggleEdit ? "Cancel" : "Edit"}
                    </Button>
                  </div>
                  <TextField
                    disabled={!toggleEdit}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    id="outlined-basic"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person2Rounded className="mail__icon" />
                        </InputAdornment>
                      ),
                    }}
                    label="Name"
                    variant={toggleEdit ? "standard" : "filled"}
                    value={user.name}
                    type="text"
                    name="username"
                    placeholder="Name"
                    className="form-control "
                  />
                </div>
                {/* ___________________ USERNAME FIELD __________________ */}
                <div className="name mb-5">
                  <div className="name-header d-flex align-items-center">
                    <h5>User Name</h5>
                  </div>
                  <TextField
                    disabled={!toggleEdit}
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                    id="outlined-basic"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SupervisedUserCircle className="mail__icon" />
                        </InputAdornment>
                      ),
                    }}
                    label="User Name"
                    variant={toggleEdit ? "standard" : "filled"}
                    value={user.username}
                    type="text"
                    name="username"
                    placeholder="User Name"
                    className="form-control "
                  />
                </div>
                {/* ___________________ EMAIL FIELD __________________ */}
                <div className="email mb-5">
                  <div className="email-header d-flex align-items-center">
                    <h5>Email Address</h5>
                  </div>
                  <TextField
                    disabled={!toggleEdit}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    id="outlined-basic"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutline className="mail__icon" />
                        </InputAdornment>
                      ),
                    }}
                    label="Email"
                    variant={toggleEdit ? "standard" : "filled"}
                    value={user.email}
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
                  </div>
                  <TextField
                    disabled={!toggleEdit}
                    onChange={(e) => setUser({ ...user, bio: e.target.value })}
                    id="outlined-basic"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BiotechRounded className="mail__icon" />
                        </InputAdornment>
                      ),
                    }}
                    label="Bio"
                    variant={toggleEdit ? "standard" : "filled"}
                    value={user.bio}
                    type="text"
                    name="bio"
                    placeholder="Bio"
                    className="form-control "
                  />
                </div>

                {/* ___________________ SAVE BUTTON __________________ */}

                {toggleEdit && (
                  <div className="save-btn mt-5">
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className="btn btn-primary"
                      style={{
                        width: "100%",
                        height: "40px",
                        cursor: loading ? "not-allowed" : "pointer",
                      }}
                      disabled={loading}
                    >
                      {loading ? <CircularProgress size={20} /> : "Save"}
                    </Button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      {/*  ________ Address Book __________ */}
      {currentTab === "Address Book" && (
        <div className="address-tab-content container my-5">
          <p className="mb-5 mt-3 fs-2 centerall fw-bolder">Addresses</p>
          <div className="address-list">
            {user.address.length > 0 ? (
              user.address.map((address, index) => (
                <div key={index} className="text-capitalize address">
                  <p className="name">{user.name}</p>
                  <p className="d-flex flex-wrap ">
                    {address.address} , {address.landmark}
                  </p>
                  <p className="d-flex flex-wrap ">
                    {address.city} , {address.state} , {address.zip}
                  </p>
                  <p className="d-flex flex-wrap">
                    <dt className="text-grey fw-lighter">Phone : </dt>
                    <dd className="text-grey"> &nbsp;{address.phone}</dd>
                  </p>
                </div>
              ))
            ) : (
              <div className="text-capitalize">
                <p className="name centerall fs-2 text-danger">
                  No Address Found
                </p>
              </div>
            )}
            <div
              className="text-capitalize new-address"
              style={{ cursor: "pointer" }}
            >
              <div>
                <Add />
                <strong>New Address</strong>
              </div>
            </div>
          </div>
        </div>
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
