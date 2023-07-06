import React, { useState } from "react";
import Lottie from "lottie-react";
import RegisterAnimation from "../assets/register.json";
import axios from "axios";
import {
  InputAdornment,
  TextField,
  IconButton,
  Button,
} from "@material-ui/core";
import {
  KeyOutlined,
  VisibilityOffOutlined,
  MailOutline,
  VisibilityOutlined,
  Person2Rounded,
} from "@mui/icons-material";

import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { registerSchema } from "../validation/ValidationSchema";
import "../Styles/login.scss";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      handleRegister(values);
    },
  });

  const handleRegister = async (values) => {
    const { username, email, password } = values;
    const data = { name: username, email: email, password: password };
    console.log(data);
    try {
      const res = await axios.post(
        "https://primepick.onrender.com/api/user/register",
        data
      );
      console.log(res.data);
      alert(res.data.message);
      formik.resetForm();
    } catch (err) {
      console.log(err.response.data.msg);
      alert(err.response.data.msg);
    }
  };
  return (
    <div className="register container">
      <div className="row justify-content-around">
        <div className="col-lg-6 py-3 col-sm-12 login-img ">
          <Lottie animationData={RegisterAnimation} />
        </div>
        <div className="col-lg-4 col-sm-12 p-3 my-4 ">
          <div className="welcome__msg py-4">
            <p className="m-0 text-grey text-uppercase">start for free :)</p>
            <h1>Sign up to get started</h1>
            <p className="pop ">
              Already a member?{" "}
              <Link to="/login" className="fw-bold">
                Log In
              </Link>
            </p>
          </div>
          {/*  ------------------Login Form------------------- */}
          <div className="login__form">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group mb-5">
                <TextField
                  onChange={formik.handleChange}
                  id="outlined-basic"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person2Rounded className="mail__icon" />
                      </InputAdornment>
                    ),
                  }}
                  label="Name"
                  variant="standard"
                  value={formik.values.username}
                  type="text"
                  name="username"
                  placeholder="Name"
                  className="form-control mx-2"
                  error={
                    formik.touched.username && formik.errors.username
                      ? true
                      : false
                  }
                  helperText={formik.touched.username && formik.errors.username}
                />
              </div>
              <div className="form-group mb-5">
                <TextField
                  onChange={formik.handleChange}
                  id="outlined-basic"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutline className="mail__icon" />
                      </InputAdornment>
                    ),
                  }}
                  value={formik.values.email}
                  label="Email"
                  variant="standard"
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-control mx-2"
                  error={
                    formik.touched.email && formik.errors.email ? true : false
                  }
                  helperText={formik.touched.email && formik.errors.email}
                />
              </div>
              <div className="form-group mb-5">
                <div>
                  <TextField
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    id="outlined-basic"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <KeyOutlined className="mail__icon" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            color={showPassword ? "primary" : "default"}
                          >
                            {showPassword ? (
                              <VisibilityOutlined />
                            ) : (
                              <VisibilityOffOutlined />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    label="Password"
                    variant="standard"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="form-control mx-2"
                    error={
                      formik.touched.password && formik.errors.password
                        ? true
                        : false
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </div>
              </div>

              <div className="login__btn my-5 d-flex ">
                <Button variant="outlined" type="submit" className="ms-1 me-5">
                  Create an account
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
