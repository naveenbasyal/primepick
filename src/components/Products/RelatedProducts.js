import { Star } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";

const RelatedProducts = ({ relatedProducts }) => {
  const navigate = useNavigate();

  const previewProduct = (productName, productId) => {
    const productNameWithHyphens = productName.replace(/\s+/g, "-");
    navigate(`/product/${productNameWithHyphens}/${productId}`);
  };

  return (
    <>
      <div className="relatedProducts">
        <h4 className="text-start">Similar Products</h4>
        <div className="products">
          {relatedProducts.map((product, id) => {
            return (
              <div
                className="singleProduct"
                key={id}
                onClick={() => previewProduct(product.name, product._id)}
              >
                <div className="image">
                  <img src={product.images[0]} alt={product.name} />
                </div>
                <div className="name">{product.name}</div>
                {/* Product Popularity */}
                <div className="popularity">
                  <p className="text-secondary fw-bold d-flex">
                    <span className="d-flex align-items-center">
                      {product.ratings}{" "}
                      <Star
                        className="text-white"
                        style={{ fontSize: "16px" }}
                      />
                    </span>
                    &nbsp;Ratings
                  </p>
                </div>
                <div className="sellingPrices fw-bold">
                  <span className="selling me-2">₹ {product.sellingPrice}</span>
                  <span className="actual fw-light me-2 text-secondary text-decoration-line-through">
                    ₹{product.price}
                  </span>
                  <span className="discount text-success fw-bold">
                    {product.discount}% off
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RelatedProducts;
