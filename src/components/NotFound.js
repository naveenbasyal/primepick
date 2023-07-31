import Lottie from "lottie-react";
import NotFoundAnimation from "../assets/NotFoundAnimation.json";

const NotFound = () => {
  return (
    <div className="px-5">
      <div className="row centerall">
        <div className="col-lg-8 col-md-10 col-sm-12">
          <Lottie animationData={NotFoundAnimation} />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
