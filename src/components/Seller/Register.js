import React from "react";
import "../../Styles/Seller.scss";
import { Link } from "react-router-dom";
import { Formik, useFormik } from "formik";
import { sellerRegisterSchema } from "../../validation/ValidationSchema";
const Register = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",

      phone: "",
      zipcode: "",
      address: "",
    },
    validationSchema: sellerRegisterSchema,
    onSubmit: (values) => {
      console.log(values);
      formik.resetForm();
    },
  });

  return (
    <div className="container mulish my-4 register-seller">
      <div className="row centerh">
        <div className="col-lg-6 col-md-10 col-sm-12">
          <h3 className="fw-bold centerall mb-4">Register as seller</h3>

          {/* ______Form______ */}
          <form onSubmit={formik.handleSubmit}>
            {/* ________ Name___________ */}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formik.values.name}
                onChange={formik.handleChange}
                className={
                  formik.touched.name && formik.errors.name
                    ? "form-control is-invalid border-red"
                    : ""
                }
              />
              {formik.touched.name && formik.errors.name && (
                <span className="text-danger">{formik.errors.name}</span>
              )}
            </div>
            {/* ________ Email ___________ */}

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
                    ? "form-control is-invalid border-red"
                    : ""
                }
              />
              {formik.touched.email && formik.errors.email && (
                <span className="text-danger">{formik.errors.email}</span>
              )}
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                {/* ________ Phone Number ___________ */}

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="text"
                    id="phone"
                    placeholder="Enter your phone no"
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
              </div>
              {/* ________ Zipcode ___________ */}

              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="zipcode">Zipcode</label>
                  <input
                    type="text"
                    id="zipcode"
                    placeholder="Enter your zipcode"
                    name="zipcode"
                    value={formik.values.zipcode}
                    onChange={formik.handleChange}
                    className={
                      formik.touched.zipcode && formik.errors.zipcode
                        ? "form-control is-invalid border-red"
                        : ""
                    }
                  />
                  {formik.touched.zipcode && formik.errors.zipcode && (
                    <span className="text-danger">{formik.errors.zipcode}</span>
                  )}
                </div>
              </div>
            </div>
            {/* ________ Address ___________ */}

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                placeholder="Enter your address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                className={
                  formik.touched.address && formik.errors.address
                    ? "form-control is-invalid border-red"
                    : ""
                }
              />
              {formik.touched.address && formik.errors.address && (
                <span className="text-danger">{formik.errors.address}</span>
              )}
            </div>
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
              <button type="submit">Submit</button>
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
