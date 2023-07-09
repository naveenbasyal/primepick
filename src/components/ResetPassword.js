import { Button, InputAdornment, TextField } from "@material-ui/core";
import { Key, MailOutline } from "@mui/icons-material";
import React from "react";

const ResetPassword = () => {
  return (
    <div className="container my-5 d-flex flex-column justify-content-center mulish">
      <h1 className="centerh main-color fw-bold">Reset Password</h1>
      <div className="row justify-content-center my-4 mx-2">
        <div
          className="col-lg-5 col-md-10 col-sm-12 shadow py-5 px-4"
          style={{ borderRadius: "8px" }}
        >
          <form>
            <div className="form-group mb-5">
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Key />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                type="password"
                className="form-control"
                id="password"
                placeholder="New Password"
              />
            </div>
            <div className="form-group mb-5">
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Key />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                type="password"
                className="form-control"
                id="confirm-password"
                placeholder="Confirm Password"
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: "#360b0e", color: "white" }}
            >
              Reset Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
