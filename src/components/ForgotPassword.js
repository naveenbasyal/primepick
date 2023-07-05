import React from "react";
import Lottie from "lottie-react";
import ForgotAnimation from "../assets/forgot.json";
import { Button, InputAdornment, TextField } from "@material-ui/core";
import { Person2Rounded } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MailOutline } from "@material-ui/icons";
const ForgotPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      formik.resetForm();
    },
  });

  return (
    <div className="container">
      <div className="row my-3 justify-content-around">
        <div className="col-md-5 col-sm-12">
          <Lottie
            animationData={ForgotAnimation}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="col-md-4 col-sm-12 my-5 px-2">
          <h1 className="display-1 alpha fw-bold">Forgot Password</h1>
          <p className="px-1 alpha pop">
            You will receive a link to create a new password via email.
          </p>
          <form onSubmit={formik.handleSubmit}>
            <div className="my-4">
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
                label="Email"
                variant="standard"
                value={formik.values.email}
                type="email"
                name="email"
                placeholder="Enter your email address"
                className="form-control mx-2 alpha"
                error={
                  formik.touched.email && formik.errors.email ? true : false
                }
                helperText={formik.touched.email && formik.errors.email}
              />
            </div>
            <div className="mb-3">
              <Button variant="outlined" type="submit" className="ms-1 me-5">
                Send
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
