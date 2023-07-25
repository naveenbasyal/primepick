import React, { useState } from "react";
import "../../Styles/Seller.scss";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useFormik } from "formik";
import { sellerRegisterSchema } from "../../validation/ValidationSchema";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      shopName: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: sellerRegisterSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    
    setLoading(true);
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}api/admin/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    setLoading(false);
    if (res.ok) {
      toast.success("Registered Successfully");
      navigate("/shop-login");
      return;
    }
    const data = await res.json();
    toast(data.msg,{
      icon: '🚫',
    });
  };

  return (
    <div className="container mulish my-4 register-seller">
      <Toaster />
      <div className="row centerh">
        <div className="col-lg-6 col-md-10 col-sm-12">
          <h3 className="fw-bold centerall mb-4">Register as seller</h3>

          {/* ______Form______ */}
          <form onSubmit={formik.handleSubmit}>
            {/* ________ Name___________ */}
            <div className="form-group">
              <label htmlFor="shopName">Shop Name</label>
              <input
                type="text"
                id="shopName"
                placeholder="Enter your shop name"
                name="shopName"
                value={formik.values.shopName}
                onChange={formik.handleChange}
                className={
                  formik.touched.shopName && formik.errors.shopName
                    ? "form-control is-invalid border-red"
                    : ""
                }
              />
              {formik.touched.shopName && formik.errors.shopName && (
                <span className="text-danger">{formik.errors.shopName}</span>
              )}
            </div>
            {/* ________ Email ___________ */}

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className={
                  formik.touched.email && formik.errors.email
                    ? "form-control is-invalid border-red"
                    : ""
                }
              />

              {formik.touched.email && formik.errors.email && (
                <span className="text-danger">{formik.errors.email}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                placeholder="Enter your phone number"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                className={
                  formik.touched.phone && formik.errors.phone
                    ? "form-control is-invalid border-red"
                    : ""
                }
              />
              {formik.touched.phone && formik.errors.phone && (
                <span className="text-danger">{formik.errors.phone}</span>
              )}
            </div>
            {/* <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                {/* ________ Phone Number ___________ */}

            {/* <div className="form-group">
                 
                </div>
              </div> */}
            {/* ________ Zipcode ___________ */}

            {/* <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="zipcode">Zipcode</label>
                  <input
                    type="text"
                    id="zipcode"
                    placeholder="Enter your zipcode"
                  />
                </div>
              </div>
            </div> */}
            {/* ________ Address ___________ */}

            {/* <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                placeholder="Enter your address"
              />
            </div> */}
            {/* ________ Password ___________ */}

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                className={
                  formik.touched.password && formik.errors.password
                    ? "form-control is-invalid border-red"
                    : ""
                }
              />
              {formik.touched.password && formik.errors.password && (
                <span className="text-danger">{formik.errors.password}</span>
              )}
            </div>
            {/* ________ Submit  ___________ */}

            <div className="form-group">
              <button type="submit">
                {loading ? "Loading . . ." : "Register"}
              </button>
            </div>
            <div className="others">
              <p>
                Already have an account?{" "}
                <Link to="/shop-login">Login to shop</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
