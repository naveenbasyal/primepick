import React, { useEffect } from "react";
import { RingLoader, PulseLoader } from "react-spinners";
import { useJwt } from "react-jwt";
import { useNavigate, useParams } from "react-router-dom";
import { ToastBar, Toaster, toast } from "react-hot-toast";
import axios from "axios";
import Lottie from "lottie-react";

import VerifyEmailAnimation from "../assets/loading.json";
const StoreVerifyEmail = () => {
  const { token } = useParams();
  const { isExpired } = useJwt(token);
  const navigate = useNavigate();
  useEffect(() => {
    if (isExpired) {
      toast.error("Token Expired");
      alert("Token Expired");
      navigate("/login");
    } else {
      verifyEmail();
    }
  }, []);

  const verifyEmail = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}api/admin/verify-email/${token}`
      );
      console.log(res.data);
      toast.success(res.data.msg);
      navigate("/shop-login");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
      navigate("/shop-login");
    }
  };

  return (
    <div className="container pop centerall" style={{ height: "70vh" }}>
      <Toaster />
      <div className="dim p-1 ">
        <Lottie
          animationData={VerifyEmailAnimation}
          className="verify centerall"
        />
        <p className="fs-5 centerall">
          Verifying email&nbsp;
          <span>
            <PulseLoader color="#000" size={6} />
          </span>
        </p>
      </div>
    </div>
  );
};

export default StoreVerifyEmail;
