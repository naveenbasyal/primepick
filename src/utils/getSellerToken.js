import { decodeToken, isExpired } from "react-jwt";

const getSellerToken = () => {
  const token = localStorage.getItem("primepick-seller");
  if (token) {
    const decodedToken = decodeToken(token);

    if (!decodedToken || !decodedToken.id || isExpired(token)) {
      localStorage.removeItem("primepick-seller");
      return null;
    }

    return token;
  }
  return null;
};

export default getSellerToken;
