import { Checkbox } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "../../Styles/Seller.scss";

const Login = () => {
  return (
    <div className="container login-shop mulish">
      <div className="row centerh">
        <div className="col-lg-5 col-md-10 col-sm-12">
          <h3 className="fw-bold centerall mb-5">Login to your shop</h3>
          <form>
            {/* _____ Email Address _____ */}
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" id="email" placeholder="Enter your email" />
            </div>
            {/* _____ Password _____ */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
              />
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
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
