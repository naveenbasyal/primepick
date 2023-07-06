import React, { useEffect } from "react";
import { RingLoader, PulseLoader } from "react-spinners";
import { useJwt } from "react-jwt";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
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
      navigate("/login");
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data);
      navigate("/login");
    }
  };
  useEffect(() => {
    if (isExpired) {
      toast.error("Token Expired");
      alert("Token Expired");
      navigate("/login");
    } else {
      verifyEmail();
    }
  }, []);

  return (
    <div className="container pop center" style={{ height: "70vh" }}>
      <div className="dim fs-3 p-1 center ">
        <RingLoader color="#5b4af1" size={100} />
        <h3 className="my-4 ">
          {" "}
          Verifying Email{" "}
          <span>
            <PulseLoader color="#5b4af1" size={7} />
          </span>
        </h3>
      </div>
    </div>
  );
};

export default VerifyEmail;
