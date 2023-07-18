import React from "react";
import "../../Styles/Seller.scss";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="container mulish my-4 register-seller">
      <div className="row centerh">
        <div className="col-lg-6 col-md-10 col-sm-12">
          <h3 className="fw-bold centerall mb-4">Register as seller</h3>

          {/* ______Form______ */}
          <form>
            {/* ________ Name___________ */}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Enter your name" />
            </div>
            {/* ________ Email ___________ */}

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" id="email" placeholder="Enter your email" />
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                {/* ________ Phone Number ___________ */}

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="text"
                    id="phone"
                    placeholder="Enter your phone number"
                  />
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
                  />
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
              />
            </div>
            {/* ________ Password ___________ */}

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
              />
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
