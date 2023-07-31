import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SellerProvider } from "./Context/SellerProvider";
import { ProductProvider } from "./Context/ProductProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ProductProvider>
      <SellerProvider>
        <App />
      </SellerProvider>
    </ProductProvider>
  </BrowserRouter>
);
