import React, { useEffect, useState } from "react";
import "../Styles/Shop.scss";
import { Link, useNavigate } from "react-router-dom";
import {
  CategoryOutlined,
  CreateNewFolderOutlined,
  CreateOutlined,
  DashboardCustomizeOutlined,
  EventAvailableOutlined,
  Logout,
  Person2Outlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import { InboxOutlined, PaymentOutlined } from "@material-ui/icons";
import Refunds from "../components/Seller/Refunds";
import AllEvents from "../components/Seller/AllEvents";
import AllOrders from "../components/Seller/AllOrders";
import AllProducts from "../components/Seller/AllProducts";
import CreateProduct from "../components/Seller/CreateProduct";
import CreateEvent from "../components/Seller/CreateEvent";
import Profile from "../components/Seller/Profile";
import Dashboard from "../components/Seller/Dashboard";
import ShopInbox from "../components/Seller/ShopInbox";
import axios from "axios";
// ________ Token __________
import getSellerToken from "../utils/getSellerToken";
import { decodeToken } from "react-jwt";
import SellerLoading from "../assets/sellerLoading.json";
import Lottie from "lottie-react";
import { Toaster, toast } from "react-hot-toast";

const Shop = () => {
  const token = getSellerToken();
  const decodedToken = decodeToken(token);
  
  const [currentPage, setCurrentPage] = useState(
    localStorage.getItem("currentPage") || "dashboard"
  );
  const [sellerProfile, setSellerProfile] = useState([]);
  const [detailsOverlay, setDetailsOverlay] = useState(false);
  // ------- Loading State -------
  const [loading, setLoading] = useState({
    sellerDataLoading: false,
    sellerDetailsLoading: false,
  });
  useEffect(() => {
    if (token && decodedToken.id) {
      getSellerData();
    }
  }, []);
  useEffect(() => {
    if (sellerProfile.address === "Store Address") {
      setDetailsOverlay(true);
    }
  }, [sellerProfile]);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  //  _________________ Get Seller Data _________________
  const getSellerData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      };
      setLoading({
        ...loading,
        sellerDataLoading: true,
      });
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}api/admin/store/${decodedToken.id}`,
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
  //  _________________ Save Seller Details _________________
  const handleSaveDetails = async () => {
    const formData = new FormData();
    formData.append("address", sellerProfile.address);
    formData.append("description", sellerProfile.description);
    formData.append("location", sellerProfile.location);
    formData.append("shopName", sellerProfile.shopName);
    formData.append("phone", sellerProfile.phone);
    formData.append("category", sellerProfile.category);

    if (
      !sellerProfile.address ||
      !sellerProfile.description ||
      !sellerProfile.location
    ) {
      toast("Please fill all the fields", {
        icon: "🚫",
      });
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      };
      setLoading({
        ...loading,
        sellerDetailsLoading: true,
      });
      const res = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}api/admin/update`,
        formData,
        config
      );
      const userData = res.data.data;
      setLoading({
        ...loading,
        sellerDetailsLoading: false,
      });
      setSellerProfile(userData);
      setLoading(false);
      setDetailsOverlay(false);
    } catch (err) {
      console.log(err.response);
      setLoading({
        ...loading,
        sellerDetailsLoading: false,
      });
    }
  };

  // __________________ Edit user details _______________

  return (
    <>
      <Toaster />
      <div className="shop">
        <div className="row">
          {/* _______ Taking Address Detials initially when seller makes an account ____ */}
          {detailsOverlay && (
            <div className="details-overlay">
              <div className="overlay-content mulish">
                <h3>Enter your details</h3>
                <label>Address:</label>
                <input
                  type="text"
                  name="address"
                  value={sellerProfile.address}
                  onChange={(e) =>
                    setSellerProfile({
                      ...sellerProfile,
                      address: e.target.value,
                    })
                  }
                />
                <label>Shop Description:</label>
                <textarea
                  name="description"
                  value={sellerProfile.description}
                  onChange={(e) =>
                    setSellerProfile({
                      ...sellerProfile,
                      description: e.target.value,
                    })
                  }
                />
                <label>Location:</label>
                <input
                  name="location"
                  type="text"
                  value={sellerProfile.location}
                  onChange={(e) =>
                    setSellerProfile({
                      ...sellerProfile,
                      location: e.target.value,
                    })
                  }
                />
                <button className="save-button" onClick={handleSaveDetails}>
                  {loading.sellerDetailsLoading ? "Saving..." : "Save Details"}
                </button>
              </div>
            </div>
          )}
          {/* _____________ Left Sidebar Part __________ */}
          <div className="col-lg-3 col-md-3 pages">
            <ul>
              <li className={currentPage === "dashboard" ? "active" : ""}>
                <DashboardCustomizeOutlined />
                <Link onClick={() => setCurrentPage("dashboard")}>
                  Dashboard
                </Link>
              </li>
              <li className={currentPage === "profile" ? "active" : ""}>
                <Person2Outlined />
                <Link onClick={() => setCurrentPage("profile")}>Profile</Link>
              </li>
              <li className={currentPage === "allOrders" ? "active" : ""}>
                <ShoppingBagOutlined />
                <Link onClick={() => setCurrentPage("allOrders")}>
                  All Orders
                </Link>
              </li>
              <li className={currentPage === "allProducts" ? "active" : ""}>
                <CategoryOutlined />
                <Link onClick={() => setCurrentPage("allProducts")}>
                  All Products
                </Link>
              </li>
              <li className={currentPage === "createProduct" ? "active" : ""}>
                <CreateNewFolderOutlined />
                <Link onClick={() => setCurrentPage("createProduct")}>
                  Create Product
                </Link>
              </li>
              <li className={currentPage === "allEvents" ? "active" : ""}>
                <EventAvailableOutlined />
                <Link onClick={() => setCurrentPage("allEvents")}>
                  All Events
                </Link>
              </li>
              <li className={currentPage === "createEvent" ? "active" : ""}>
                <CreateOutlined />
                <Link onClick={() => setCurrentPage("createEvent")}>
                  Create Event
                </Link>
              </li>
              <li className={currentPage === "shopInbox" ? "active" : ""}>
                <InboxOutlined />
                <Link onClick={() => setCurrentPage("shopInbox")}>
                  Shop Inbox
                </Link>
              </li>
              <li className={currentPage === "refunds" ? "active" : ""}>
                <PaymentOutlined />
                <Link onClick={() => setCurrentPage("refunds")}>Refunds</Link>
              </li>
              <li className="sellerLogout">
                <Logout />
                <Link
                  to={"/"}
                  onClick={() => {
                    localStorage.removeItem("primepick-seller");
                    localStorage.removeItem("currentPage");
                  }}
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
          {/* _____________ Right Content Part __________ */}

          <div className="col-lg-9 col-md-9 content">
            {loading.sellerDataLoading ? (
              <Lottie
                className="loadingAnimation"
                animationData={SellerLoading}
              />
            ) : // _______________ Dashboard _______________
            currentPage === "dashboard" ? (
              <Dashboard />
            ) : // _______________ Profile _______________
            currentPage === "profile" ? (
              <Profile
                sellerProfile={sellerProfile}
                setSellerProfile={setSellerProfile}
              />
            ) : // _______________ All Orders _______________
            currentPage === "allOrders" ? (
              <AllOrders />
            ) : // _______________ All Products _______________
            currentPage === "allProducts" ? (
              <AllProducts />
            ) : // _______________ Create Product _______________
            currentPage === "createProduct" ? (
              <CreateProduct />
            ) : // _______________ All Events _______________
            currentPage === "allEvents" ? (
              <AllEvents />
            ) : // _______________ Create Event _______________
            currentPage === "createEvent" ? (
              <CreateEvent />
            ) : // _______________ Shop Inbox _______________
            currentPage === "shopInbox" ? (
              <ShopInbox />
            ) : // _______________ Refunds _______________
            currentPage === "refunds" ? (
              <Refunds />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
