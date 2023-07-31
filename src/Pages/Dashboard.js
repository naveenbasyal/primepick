import React, { useEffect, useState } from "react";
import "../Styles/Dashboard.scss";
import getToken from "../utils/getToken";
import { decodeToken } from "react-jwt";
import Lottie from "lottie-react";
import LoadingAnimation from "../assets/loading.json";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import DashNavbar from "./DashboardTabs/DashNavbar";
import Orders from "./DashboardTabs/Orders";
import Address from "./DashboardTabs/Address";
import PersonalInfo from "./DashboardTabs/PersonalInfo";
import WishList from "./DashboardTabs/Wishlist";

const Dashboard = () => {
  const token = getToken();
  const decodedToken = decodeToken(token);

  // ________________________ STATES ________________________
  const [user, setUser] = useState(null);
  const [currentTab, setCurrentTab] = useState(
    localStorage.getItem("primepick-currentTab") || "Personal Information"
  );
  const [toggleEdit, setToggleEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toggleAddAddress, setToggleAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    address: "",
    landmark: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  // ___________________ USE EFFECT ________________________

  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, [token]);
  //  _________ GET USER DATA _____________
  const getUserData = async () => {
    console.log(decodeToken(token).id)
    console.log(token);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      };
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}api/user/${decodeToken(token).id}`,
        config
      );
      const userData = res.data;
      setUser(userData);
    } catch (err) {
      console.log(err.response);
    }
  };
  // ________________________ ADD ADDRESS ________________________
  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (
      newAddress.address === "" ||
      newAddress.city === "" ||
      newAddress.state === "" ||
      newAddress.zip === "" ||
      newAddress.phone === ""
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}api/user/addaddress`,
        newAddress,
        config
      );

      getUserData();
      setLoading(false);
      setToggleAddAddress(false);
      toast.success("Address Added Successfully");
      setNewAddress({
        address: "",
        landmark: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
      });
    } catch (err) {
      console.log("Error response:", err.response?.data);
      toast.error(err.response.data.msg);
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      setLoading(id);
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}api/user/removeaddress`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: {
            addressId: id,
          },
        }
      );
      const updatedAddress = user.address.filter(
        (address) => address._id !== id
      );
      setUser((prevUser) => ({
        ...prevUser,
        address: updatedAddress,
      }));
      setLoading(false);
      toast.success("Address Deleted Successfully");
    } catch (err) {
      console.log("Error response:", err.response.data.msg);
      setLoading(false);
      toast.error(err.response.data.msg);
    }
  };
  if (!token) {
    return (
      <>
        <div className="container center mt-5" style={{ height: "60vh" }}>
          You Need to Login in First !!
        </div>
      </>
    );
  }
  if (!user) {
    return (
      <>
        <div className="container center mt-5" style={{ height: "60vh" }}>
          <Lottie
            animationData={LoadingAnimation}
            className="verify centerall"
          />
        </div>
      </>
    );
  }
  return (
    <>
      <Toaster />
      <DashNavbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {/*  ________ Personal Information __________ */}
      {currentTab === "Personal Information" && (
        <PersonalInfo
          user={user}
          setUser={setUser}
          toggleEdit={toggleEdit}
          setToggleEdit={setToggleEdit}
          token={token}
          setLoading={setLoading}
        />
      )}

      {/*  ________ Address Book __________ */}
      {currentTab === "Address Book" && (
        <Address
          user={user}
          toggleAddAddress={toggleAddAddress}
          setToggleAddAddress={setToggleAddAddress}
          handleAddAddress={handleAddAddress}
          loading={loading}
          newAddress={newAddress}
          handleDeleteAddress={handleDeleteAddress}
          setNewAddress={setNewAddress}
          token={token}
          getUserData={getUserData}
          setLoading={setLoading}
        />
      )}

      {/*  ________ My Orders __________ */}
      {currentTab === "My Orders" && <Orders user={user} />}

      {/*  ________ My Reviews __________ */}
      {currentTab === "My Wishlist" && <WishList user={user} />}
    </>
  );
};

export default Dashboard;
