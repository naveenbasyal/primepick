import React, { useContext, useEffect, useState } from "react";
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
import { decodeToken } from "react-jwt";
import SellerLoading from "../assets/sellerLoading.json";
import Lottie from "lottie-react";
import { Toaster, toast } from "react-hot-toast";
import Unauthorized from "../components/Unauthorized";
import { SellerContext } from "../Context/SellerProvider";
import getSellerToken from "../utils/getSellerToken";
import { useFormik } from "formik";
import * as Yup from "yup";
const Shop = () => {
  const token = getSellerToken();
  const {
    sellerProfile,
    setSellerProfile,
    loading,
    setLoading,
    getSellerProducts,
    setSellerLogin,
  } = useContext(SellerContext);

  const [currentPage, setCurrentPage] = useState(
    localStorage.getItem("currentPage") || "dashboard"
  );
  const [detailsOverlay, setDetailsOverlay] = useState(false);

  //  Seller Address Details
  useEffect(() => {
    if (sellerProfile.address === "Store Address") {
      setDetailsOverlay(true);
    }
  }, [sellerProfile]);
  useEffect(() => {
    getSellerProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  const formik = useFormik({
    initialValues: {
      address: "",
      description: "",
      location: "",
    },
    validationSchema: Yup.object({
      address: Yup.string()
        .min(5, "Must be 5 characters or more")
        .required("Required"),
      description: Yup.string()
        .min(10, "Must be 10 characters or more")
        .required("Required"),
      location: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      handleSaveDetails();
      formik.resetForm();
    },
  });
  //  _________________ Save Seller Details _________________
  const handleSaveDetails = async () => {
    const { address, description, location } = formik.values;
    const formData = new FormData();
    formData.append("address", address);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("shopName", sellerProfile.shopName);
    formData.append("phone", sellerProfile.phone);
    formData.append("category", sellerProfile.category);

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
        `${process.env.REACT_APP_SERVER_URL}api/store/update`,
        formData,
        config
      );
      const userData = res.data.data;
      setDetailsOverlay(false);
      setLoading({
        ...loading,
        sellerDetailsLoading: false,
      });
      setSellerProfile(userData);
    } catch (err) {
      console.log(err.response);
      setLoading({
        ...loading,
        sellerDetailsLoading: false,
      });
    }
  };

  return (
    <>
      <Toaster />
      {token && decodeToken(token).id ? (
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
                    placeholder="ex: 123, abc street, xyz city"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    className={
                      formik.touched.address && formik.errors.address
                        ? "form-control is-invalid border-red"
                        : ""
                    }
                  />
                  {formik.touched.address && formik.errors.address && (
                    <div className="invalid-feedback">
                      {formik.errors.address}
                    </div>
                  )}
                  <label>Shop Description:</label>
                  <textarea
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    placeholder="ex: We are a small shop selling handmade products"
                    className={
                      formik.touched.description && formik.errors.description
                        ? "form-control is-invalid border-red"
                        : ""
                    }
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div className="invalid-feedback">
                      {formik.errors.description}
                    </div>
                  )}

                  <label>Location:</label>
                  <input
                    name="location"
                    type="text"
                    value={formik.values.location}
                    placeholder="ex: xyz city , abc state, country"
                    onChange={formik.handleChange}
                    className={
                      formik.touched.location && formik.errors.location
                        ? "form-control is-invalid border-red"
                        : ""
                    }
                  />
                  {formik.touched.location && formik.errors.location && (
                    <div className="invalid-feedback">
                      {formik.errors.location}
                    </div>
                  )}
                  <button className="save-button" onClick={formik.handleSubmit}>
                    {loading.sellerDetailsLoading
                      ? "Saving..."
                      : "Save Details"}
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
                      setSellerLogin(false);
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
      ) : (
        <Unauthorized />
      )}
    </>
  );
};

export default Shop;
