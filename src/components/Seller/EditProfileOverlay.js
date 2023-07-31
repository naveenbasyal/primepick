import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Cancel, CancelOutlined } from "@mui/icons-material";
import { sellerBasicDetailsSchema } from "../../validation/ValidationSchema";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const EditProfileOverlay = ({
  sellerProfile,
  setToggleEdit,
  setSellerProfile,
}) => {
  const [loading, setLoading] = useState(false);
  const {
    address,
    location,
    phone,
    shopName,
    createdAt,
    email,
    logo,
    description,
    category,
  } = sellerProfile;
  // ______________________ Formik ______________________
  const formik = useFormik({
    initialValues: {
      shopName: shopName,
      description: description,
      address: address,
      location: location,
      phone: phone,
    },
    validationSchema: sellerBasicDetailsSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  //   _______________ Handle Edit Basic Details ______________
  const handleEditBasicDetails = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("primepick-seller")
          )}`,
        },
      };

      const formData = new FormData();

      formData.append("shopName", formik.values.shopName);
      formData.append("description", formik.values.description);
      formData.append("address", formik.values.address);
      formData.append("location", formik.values.location);
      formData.append("phone", formik.values.phone);
      formData.append("category", category);

      setLoading(true);
      const res = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}api/store/update`,
        formData,
        config
      );
      const data = await res.data.data;
      setLoading(false);
      setSellerProfile(data);
      toast.success("Profile Updated");
      setToggleEdit(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="editProfile">
      <Toaster />
      <div className="editProfileContainer">
        <div className="editProfileHeader">
          <h4>Edit Profile</h4>
          <span onClick={() => setToggleEdit(false)}>
            <CancelOutlined />
          </span>
        </div>
        <div className="editProfileBody">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="shopName">Shop Name</label>
              <input
                type="text"
                className={
                  formik.errors.shopName && formik.touched.shopName
                    ? "form-control is-invalid border-red"
                    : ""
                }
                id="shopName"
                name="shopName"
                onChange={formik.handleChange}
                value={formik.values.shopName}
              />
              {formik.errors.shopName && formik.touched.shopName ? (
                <div className="invalid-feedback">{formik.errors.shopName}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className={
                  formik.errors.description && formik.touched.description
                    ? "form-control is-invalid border-red"
                    : ""
                }
                id="description"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
              />

              {formik.errors.description && formik.touched.description ? (
                <div className="invalid-feedback">
                  {formik.errors.description}
                </div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className={
                  formik.errors.address && formik.touched.address
                    ? "form-control is-invalid border-red"
                    : ""
                }
                id="address"
                name="address"
                onChange={formik.handleChange}
                value={formik.values.address}
              />
              {formik.errors.address && formik.touched.address ? (
                <div className="invalid-feedback">{formik.errors.address}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                className={
                  formik.errors.location && formik.touched.location
                    ? "form-control is-invalid border-red"
                    : ""
                }
                id="location"
                name="location"
                onChange={formik.handleChange}
                value={formik.values.location}
              />
              {formik.errors.location && formik.touched.location ? (
                <div className="invalid-feedback">{formik.errors.location}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                className={
                  formik.errors.phone && formik.touched.phone
                    ? "form-control is-invalid border-red"
                    : ""
                }
                id="phone"
                name="phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
              {formik.errors.phone && formik.touched.phone ? (
                <div className="invalid-feedback">{formik.errors.phone}</div>
              ) : null}
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleEditBasicDetails}
            >
              {loading ? "Saving ..." : "Save"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileOverlay;
