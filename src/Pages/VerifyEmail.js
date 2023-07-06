import React, { useEffect } from "react";
import { RingLoader, PulseLoader } from "react-spinners";
import { useJwt } from "react-jwt";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import Lottie from "lottie-react";
import VerifyEmailAnimation from "../assets/loading.json";
const VerifyEmail = () => {
  const { token } = useParams();
  const { isExpired } = useJwt(token);
  const navigate = useNavigate();

  const verifyEmail = async () => {
    try {
      const res = await axios.get(
        `https://primepick.onrender.com/api/user/verify-email/${token}`
      );
      console.log(res.data);
      toast.success(res.data.message);
      // navigate("/login");
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data);
      // navigate("/login");
    }
  };
  useEffect(() => {
    if (isExpired) {
      toast.error("Token Expired");
      alert("Token Expired");
      // navigate("/login");
    } else {
      verifyEmail();
    }
  }, []);

  return (
    <div className="container pop centerall" style={{ height: "70vh" }}>
      <div className="dim p-1 center ">
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

export default VerifyEmail;
