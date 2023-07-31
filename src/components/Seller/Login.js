import { Checkbox } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Styles/Seller.scss";
import { Toaster, toast } from "react-hot-toast";
import { useFormik } from "formik";
import { sellerLoginSchema } from "../../validation/ValidationSchema";
import { SellerContext } from "../../Context/SellerProvider";

const Login = () => {
  const { setSellerLogin, getSellerData } = useContext(SellerContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: sellerLoginSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}api/store/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const data = await res.json();

      localStorage.setItem("primepick-seller", JSON.stringify(data.data.token));
      setSellerLogin(true);
      toast.success("Login Successful");
      setLoading(false);
      getSellerData(data.data.token);
      navigate("/shop");
    } catch (error) {
      console.error("An error occurred:", error.message);
      setLoading(false);
      toast.error(" Invalid Credentials");
    }
  };

  return (
    <div className="container login-shop mulish">
      <Toaster />
      <div className="row centerh">
        <div className="col-lg-5 col-md-10 col-sm-12">
          <h3 className="fw-bold centerall mb-5">Login to your shop</h3>
          <form onSubmit={formik.handleSubmit}>
            {/* _____ Email Address _____ */}
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
              {formik.touched.email && formik.errors.email ? (
                <div className="invalid-feedback">{formik.errors.email}</div>
              ) : null}
            </div>
            {/* _____ Password _____ */}
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
              {formik.touched.password && formik.errors.password ? (
                <div className="invalid-feedback">{formik.errors.password}</div>
              ) : null}
            </div>
            {/* _____ Remember Me & Forgot Password _____ */}
            <div className="form-help">
              <div className="remember__me">
                <Checkbox color="primary" className="remember__me__checkbox" />
                <p className="main-color m-0 centerall">Remember Me</p>
              </div>
              <div className="forgot__password ">
                <Link to="/forgotpassword">Forgot Password?</Link>
              </div>
            </div>
            {/* _____ Submit Button _____ */}
            <div className="form-group">
              <button
                type="submit"
                className={loading ? "bg-secondary" : ""}
                disabled={loading}
              >
                {loading ? "Loading . . ." : "Login"}
              </button>
            </div>
            {/* _____ Register Link _____ */}
            <div className="form-group">
              <p className="centerv">
                Don't have an account?{" "}
                <Link to="/create-shop" className="main-color ms-2">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
