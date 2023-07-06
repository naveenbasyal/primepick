import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import LoginAnimation from "../assets/login.json";
import axios from "axios";
import {
  Checkbox,
  InputAdornment,
  TextField,
  IconButton,
  Button,
} from "@material-ui/core";

import {
  VisibilityOutlined,
  VisibilityOffOutlined,
  KeyOutlined,
  MailOutline,
} from "@mui/icons-material";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../validation/ValidationSchema";
import getToken from "../utils/getToken";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const token = getToken();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  useEffect(() => {
    if (token) {
      navigate("/");
    } else {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleLogin = async () => {
    const { email, password } = formik.values;
    const data = { email: email, password: password };
    try {
      const res = await axios.post(
        "https://primepick.onrender.com/api/user/login",
        data
      );
      console.log(res.data);

      localStorage.setItem("primepick", res.data.token);
      navigate("/");
    } catch (err) {
      console.log(err.response);
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="login container">
      <div className="row justify-content-around">
        <div className="col-lg-5 col-sm-12 login-img ">
          <Lottie animationData={LoginAnimation} className="login__animation" />
        </div>
        <div className="col-lg-4 col-sm-12 p-3 my-4 ">
          <div className="welcome__msg py-4">
            <h1 className="fs-2">Welcome Back :)</h1>
            <p>
              To keep connected with us please login by email address and
              password🔔
            </p>
          </div>
          <div className="login__form">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group mb-5">
                <TextField
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  id="outlined-basic"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutline className="mail__icon" />
                      </InputAdornment>
                    ),
                  }}
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
                    value={formik.values.password}
                    onChange={formik.handleChange}
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
                            onClick={() => {
                              setShowPassword(!showPassword);
                            }}
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
              <div className="extras d-flex justify-content-between">
                <div className="remember__me  d-flex align-items-center">
                  <Checkbox
                    color="primary"
                    className="remember__me__checkbox"
                  />
                  <p className="text-grey m-0 centerall">Remember Me</p>
                </div>
                <div className="forgot__password centerall ">
                  <Link className="text-grey " to="/forgotpassword">
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <div className="login__btn my-5 d-flex ">
                <Button variant="outlined" type="submit" className="ms-1 me-5">
                  Login
                </Button>
                <Link to="/register">
                  <Button variant="outlined">Sign Up</Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
