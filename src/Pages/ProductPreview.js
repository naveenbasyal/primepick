import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios, { all } from "axios";
import { Toaster, toast } from "react-hot-toast";
import { format, isValid, parseISO, set } from "date-fns";
import { Add, FavoriteBorder, Remove, Star } from "@mui/icons-material";
import { ProductContext } from "../Context/ProductProvider";
import loadingAnimation from "../assets/sellerLoading.json";
import Lottie from "lottie-react";
import RelatedProducts from "../components/Products/RelatedProducts";
import "../Styles/PreviewProduct.scss";

const ProductPreview = () => {
  const { getAllProducts, allproducts } = useContext(ProductContext);
  // State variables
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [heroImage, setHeroImage] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [currentDetails, setCurrentDetails] = useState("sellerInformation");
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Get the product ID from URL parameters
  const productId = useParams().productId;

  // Fetch the single product data from the server
  useEffect(() => {
    getSingleProduct(productId);
    getAllProducts();
  }, [productId]);

  useEffect(() => {
    if (allproducts.length > 0 && product) {
      const actualProductTags = product.tags[0].split(",");

      const filteredProducts = allproducts.map((product) => {
        const allProductTags = product.tags[0].split(",");
        const commonTags = allProductTags.filter((tag) =>
          actualProductTags.includes(tag)
        );
        return { ...product, commonTags };
      });
      const relatedProducts = filteredProducts.filter((prod) => {
        return prod.commonTags.length > 0 && prod._id !== product._id;
      });
      setRelatedProducts(relatedProducts);
    }
  }, [product, allproducts]);

  const getSingleProduct = async (id) => {
    try {
      setLoading(true);
      window.scrollTo(0, 0);
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}api/public/product/${id}`
      );
      const data = res.data.data;
      setProduct(data);
      setLoading(false);
      setSelectedImage(data.images[0]);
      setHeroImage(data.images[0]);
    } catch (err) {
      console.log(err.response);
      toast.error("Something went wrong");
    }
  };

  if (!product) {
    return <div className="centerall"> No Product to preview</div>;
  }

  return (
    <>
      <Toaster />
      {loading ? (
        <Lottie animationData={loadingAnimation} className="previewLoading" />
      ) : (
        <div className="productPreview container  mulish">
          <div className="row justify-content-between">
            {/* Product Images */}
            <div className="productPreview__left my-4 col-lg-5 col-md-6 col-sm-12 col-xs-12">
              <div className="images">
                {/* Hero Image */}
                <div className="heroImage">
                  <img src={heroImage || product.images[0]} alt="" />
                </div>

                {/* All Images */}
                <div className="allImages">
                  {product.images.map((img, id) => {
                    return (
                      <div
                        className={`singleImage ${
                          selectedImage === img ? "selected" : ""
                        }`}
                        key={id}
                        onClick={() => {
                          setHeroImage(img);
                          setSelectedImage(img);
                        }}
                      >
                        <img src={img} alt="" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="productPreview__right my-4  col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div className="productName">
                <h2>{product.name}</h2>
              </div>

              {/* Product Popularity */}
              <div className="popularity">
                <p className="fw-bold text-secondary d-flex">
                  <span className="text-dark d-flex align-items-center">
                    {product.ratings}{" "}
                    <Star
                      className="text-success"
                      style={{ fontSize: "18px" }}
                    />
                  </span>
                  &nbsp; Ratings & &nbsp;
                  <span>{product.reviews.length} Reviews</span>
                </p>
              </div>

              {/* Product Description */}
              <div className="productDescription">
                <p>{product.description}</p>
              </div>

              {/* Product Prices */}
              <div className="productPrices fw-bold">
                <span className="selling fs-5 me-4">
                  ₹ {product.sellingPrice}
                </span>
                <span className="actual fw-light me-3 text-secondary text-decoration-line-through">
                  ₹{product.price}
                </span>
                <span className="discount text-success fw-bold">
                  {product.discount}% off
                </span>
              </div>

              {/* Add to Cart Button and Favorite Icon */}
              <div className="addToCart mt-5">
                <button>Add to Cart</button>
                <FavoriteBorder />
              </div>

              {/* Seller Information */}
              <div className="seller position-absolute">
                <div className="sellerImage">
                  <img src={product.seller.logo} alt="" />
                </div>
                <div className="sellerName">
                  <p>{product.seller.shopName}</p>
                  <p>({product.seller.rating}) Ratings</p>
                </div>
                <div className="sendMessage">
                  <button>Send Message</button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details, Reviews, and Seller Information */}
          <div className="moreDetails container my-5 ">
            <div className="row headings justify-content-between">
              {/* Product Details Heading */}
              <div className="col col-lg-3 col-md-2 col-sm-12">
                <div className="productDetails centerall">
                  <h5
                    className={`text-start ${
                      currentDetails === "productDetails" && "active"
                    } `}
                    onClick={() => {
                      setCurrentDetails("productDetails");
                    }}
                  >
                    Product Details
                  </h5>
                </div>
              </div>

              {/* Product Reviews Heading */}
              <div className="col col-lg-3 col-md-2 col-sm-12">
                <div className="productReviews centerall">
                  <h5
                    className={`text-center ${
                      currentDetails === "productReviews" && "active"
                    } `}
                    onClick={() => {
                      setCurrentDetails("productReviews");
                    }}
                  >
                    Product Reviews
                  </h5>
                </div>
              </div>

              {/* Seller Information Heading */}
              <div className="col col-lg-3 col-md-2 col-sm-12">
                <div className="sellerInformation centerall">
                  <h5
                    className={`text-end ${
                      currentDetails === "sellerInformation" && "active"
                    } `}
                    onClick={() => {
                      setCurrentDetails("sellerInformation");
                    }}
                  >
                    Seller Information
                  </h5>
                </div>
              </div>
            </div>
            <div className="details ">
              {/* Render content based on the currently selected tab */}
              {currentDetails === "productDetails" ? (
                <div className="productDetails">{product.description}</div>
              ) : currentDetails === "productReviews" ? (
                <div className="productReviews">
                  {product.reviews.length > 0 ? (
                    <div>{product.reviews}</div>
                  ) : (
                    <div className="noReviews centerall">No Reviews</div>
                  )}
                </div>
              ) : (
                currentDetails === "sellerInformation" && (
                  <div className="sellerInformation row justify-content-between">
                    <div className="col col-lg-5 col-md-4 col-sm-12 col-xs-12">
                      <div className="seller ">
                        <div className="sellerImage">
                          <img src={product.seller.logo} alt="" />
                        </div>
                        <div className="sellerName">
                          <p>{product.seller.shopName}</p>
                          <p>({product.seller.rating}) Ratings</p>
                        </div>
                      </div>
                      <div className="sellerDescription">
                        <p>{product.seller.description}</p>
                      </div>
                    </div>
                    <div className="col col-lg-5 col-md-4 col-sm-12 col-xs-12">
                      {/* Seller Information Details */}
                      <div className="d-flex flex-wrap">
                        <p className="fw-bold text-secondary">Joined On : </p>
                        &nbsp;
                        <p>
                          {isValid(parseISO(product.seller.createdAt))
                            ? format(
                                parseISO(product.seller.createdAt),
                                "dd/MMM/yyyy"
                              )
                            : "Invalid date"}
                        </p>
                      </div>
                      <div className="d-flex flex-wrap">
                        <p className="fw-bold text-secondary">Email : </p>&nbsp;
                        <p>
                          <a>{product.seller.email}</a>
                        </p>
                      </div>
                      <div className="d-flex flex-wrap">
                        <p className="fw-bold text-secondary">Address : </p>
                        &nbsp;
                        <p className="mb-0">
                          {product.seller.address +
                            "," +
                            product.seller.location}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* ---------------------Related Products--------------------- */}
          <>
            {relatedProducts.length > 0 && (
              <RelatedProducts relatedProducts={relatedProducts} />
            )}
          </>
        </div>
      )}
    </>
  );
};

export default ProductPreview;
