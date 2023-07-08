import { decodeToken, isExpired } from "react-jwt";

const getToken = () => {
  const token = localStorage.getItem("primepick");
  if (token) {
    const decodedToken = decodeToken(token);

    if (!decodedToken || !decodedToken.id || isExpired(token)) {
      localStorage.removeItem("primepick");
      return null;
    }

    return token;
  }
  return null;
};

export default getToken;
