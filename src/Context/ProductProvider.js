import axios from "axios";
import { createContext, useState } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [allproducts, setAllProducts] = useState([]);
  const getSingleProduct = async (productId) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}api/public/product/${productId}`
      );
      const product = res.data.data;
      setProduct(product);
      //   console.log(product);
    } catch (err) {
      console.log(err.response);
    }
  };
  const getAllProducts = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}api/public/allproducts/`
      );
      const product = res.data.data;
      setAllProducts(product);
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        getSingleProduct,
        product,
        allproducts,
        getAllProducts,
        setProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
