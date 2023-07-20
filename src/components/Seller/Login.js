import { Checkbox } from "@material-ui/core";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Styles/Seller.scss";
import { toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate()
  const [value, setValue] =useState({
    email:"",
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
    console.log(value);
    if(!value.email || !value.password){
      toast.error("Please fill in all fields.")
      return
    }
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}api/admin/login`,{
              method:
              "POST",
              headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify(value)

              
    })
    if(res.ok){
      toast.success("Logged in successfully")
      navigate("/dashboard")
      return
    }
    const data = await res.json()
    toast.error(data.msg)
  }
  return (
    <div className="container login-shop mulish">
      <div className="row centerh">
        <div className="col-lg-5 col-md-10 col-sm-12">
          <h3 className="fw-bold centerall mb-5">Login to your shop</h3>
          <form onSubmit={handleSubmit}>
            {/* _____ Email Address _____ */}
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" id="email" placeholder="Enter your email"   name="email" value={value.email} onChange={handleChange} />
            </div>
            {/* _____ Password _____ */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                name="password" value={value.password} onChange={handleChange}
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
