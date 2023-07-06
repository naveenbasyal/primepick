import { Button, TextField } from "@material-ui/core";
import React from "react";

const ResetPassword = () => {
  return (
    <div className="container my-5 d-flex flex-column justify-content-center">
      <h1 className="centerh">Reset Password</h1>
      <div className="row justify-content-center my-4">
        <div className="col-md-6">
          <form>
            <div className="form-group my-3">
              <label htmlFor="password">Password</label>
              <TextField
                type="password"
                className="form-control"
                id="password"
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="password">Confirm Password</label>
              <TextField
                type="password"
                className="form-control"
                id="password"
              />
            </div>
            <Button type="submit" className="btn btn-primary">
              Reset Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
