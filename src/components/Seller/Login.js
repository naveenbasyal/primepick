import { Checkbox } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "../../Styles/Seller.scss";
import { Formik, useFormik } from "formik";
import { sellerLoginSchema } from "../../validation/ValidationSchema";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: sellerLoginSchema,
    onSubmit: (values) => {
      console.log(values);
      formik.resetForm();
    },
  });

  return (
    <div className="container login-shop mulish">
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
                name="email"
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className={
                  formik.touched.email && formik.errors.email
                    ? "form-control is-invalid  border-red"
                    : ""
                }
              />
              {formik.touched.email && formik.errors.email && (
                <span className="text-danger">{formik.errors.email}</span>
              )}
            </div>
            {/* _____ Password _____ */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
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
            {/* _____ Remember Me & Forgot Password _____ */}
            <div className="form-help">
              <div className="remember__me">
                <Checkbox color="primary" className="remember__me__checkbox" />
                <p className="main-color m-0 centerall">Remember Me</p>
              </div>
              <div className="forgot__password">
                <Link to="/forgotpassword">Forgot Password?</Link>
              </div>
            </div>
            {/* _____ Submit Button _____ */}
            <div className="form-group">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
