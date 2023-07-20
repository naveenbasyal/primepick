import React, { useState } from "react";
import "../../Styles/Seller.scss";
import { Link, useNavigate } from "react-router-dom";
import {toast} from 'react-hot-toast'
const Register = () => {
  const navigate =useNavigate()
  const [value,setValue]= useState({
    shopName:"",
    email:"",
    phone:"",
    password:""
  })

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log(value);
    if(!value.shopName || !value.email || !value.phone || !value.password){
      return toast.error("Please fill in all fields.")
    }

    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}api/admin/register`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(value)
    })
    if(res.ok){
      toast.success("Registered Successfully")
      navigate("/shop-login")
      return
    }
    const data = await res.json()
    toast.error(data.msg)
  }

  return (
    <div className="container mulish my-4 register-seller">
      <div className="row centerh">
        <div className="col-lg-6 col-md-10 col-sm-12">
          <h3 className="fw-bold centerall mb-4">Register as seller</h3>

          {/* ______Form______ */}
          <form onSubmit={handleSubmit}>
            {/* ________ Name___________ */}
            <div className="form-group">
              <label htmlFor="shopName">Shop Name</label>
              <input
                type="text"
                id="shopName"
                placeholder="Enter your shop name"
                name="shopName"
                value={value.shopName}
                onChange={handleChange}
              />
            </div>
            {/* ________ Email ___________ */}

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" id="email" placeholder="Enter your email" name="email" value={value.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                placeholder="Enter your phone number"
                name="phone"
                value={value.phone}
                onChange={handleChange}
              />
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
                value={value.password}
                onChange={handleChange}
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
