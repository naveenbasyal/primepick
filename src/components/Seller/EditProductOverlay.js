import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { createProductSchema } from "../../validation/ValidationSchema";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Add, Clear, PhotoCamera } from "@mui/icons-material";
import { Toaster, toast } from "react-hot-toast";
import { SellerContext } from "../../Context/SellerProvider";
import { FormHelperText, TextareaAutosize } from "@material-ui/core";

import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import axios from "axios";

const EditProductOverlay = ({ product }) => {
  // ________ Context _______
  const { getSellerProducts } = useContext(SellerContext);
  // __________ States __________
  const [selectedCategory, setSelectedCategory] = useState("");

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(product?.images);
  const initialValues = {
    name: product?.name,
    description: product?.description,
    category: product?.category,
    subCategory: product?.subCategory,
    price: product?.price,
    discount: product?.discount,
    sellingPrice: product?.sellingPrice,
    tags: product?.tags,
    sizes: product?.sizes,
    stock: product?.stock,
    pincodes: product?.pincodes,
    colors: product?.colors,
    images: product?.images,
    productDetails:
      "This is the name This is the name This is the name This is the name This is the name This is the name This is the name This is the name This is the name This is the name This is the name This is the name This is the name This is the name This is the name This is the name ",
  };

  // _____________ Categories ______________
  const categories = [
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Books",
    "Sports",
    "Beauty",
    "Toys",
    "Health & Personal Care",
    "Automotive",
    "Grocery",
    "other",
  ];
  // ______________ Subcategories ________________
  const subCategoriesMap = {
    Electronics: ["Mobiles", "Laptops", "Tablets", "Cameras", "Accessories"],
    Fashion: [
      "Men's Fashion",
      "Women's Fashion",
      "Kids' Fashion",
      "Footwear",
      "Accessories",
    ],
    "Home & Kitchen": [
      "Appliances",
      "Furniture",
      "Cookware",
      "Home Decor",
      "Bedding",
    ],
    Books: ["Fiction", "Non-Fiction", "Mystery", "Science Fiction", "Romance"],
    Sports: ["Outdoor", "Indoor", "Fitness", "Team Sports", "Water Sports"],
    Beauty: ["Skincare", "Makeup", "Fragrances", "Haircare", "Personal Care"],
    Toys: ["Action Figures", "Dolls", "Building Blocks", "Puzzles", "Vehicles"],
    "Health & Personal Care": [
      "Personal Care",
      "Vitamins & Supplements",
      "Medical Supplies",
      "First Aid",
      "Wellness",
    ],
    Automotive: [
      "Car Accessories",
      "Motorcycle Accessories",
      "Tools",
      "Car Care",
      "Exterior Accessories",
    ],
    Grocery: [
      "Food",
      "Beverages",
      "Snacks",
      "Canned Goods",
      "Dairy",
      "Bakery",
      "Frozen Food",
    ],
    Other: ["Miscellaneous"],
  };

  // ______________Colors _______________
  const colors = [
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Black",
    "White",
    "Orange",
    "Purple",
    "Pink",
    "Brown",
    "Gray",
  ];

  const handleSubmit = async (values, { resetForm }) => {
    if (!values.pincodes) {
      values.pincodes = "All india service";
    } else if (values.pincodes.includes(",")) {
      values.pincodes = values.pincodes.split(",");
    } else {
      values.pincodes = values.pincodes;
    }

    console.log(values);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("category", values.category);
    formData.append("subCategory", values.subCategory);
    formData.append("discount", values.discount);
    formData.append("sellingPrice", values.sellingPrice);
    formData.append("pincodes", values.pincodes);
    formData.append("productDetails", values.productDetails);
    formData.append("stock", values.stock);
    formData.append("tags", values.tags);

    for (let i = 0; i < values.sizes.length; i++) {
      formData.append("sizes", values.sizes[i]);
    }
    for (let i = 0; i < values.colors.length; i++) {
      formData.append("colors", values.colors[i]);
    }

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}api/store/updateproduct/${product?._id}`,
        {
          body: values,
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("primepick-seller")
            )}`,
          },
        }
      );

      console.log(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err.response.data);
      setLoading(false);
      toast.error("Something went wrong");
    }
  };
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setImages(items);
  };
  return (
    <div className="createProduct my-3 mulish">
      <Toaster />
      <Formik
        initialValues={initialValues}
        validationSchema={createProductSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          errors,
          touched,
        }) => (
          <Form style={{ display: "grid", rowGap: "2rem" }}>
            {/* _________ Product Name _________ */}
            <div className="form-field">
              <TextField
                fullWidth
                variant="outlined"
                label="Product Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.name && touched.name)}
                helperText={<ErrorMessage name="name" />}
              />
            </div>
            {/* _________ Product Description _________ */}
            <div className="form-field">
              <FormControl
                fullWidth
                error={Boolean(errors.description && touched.description)}
              >
                <TextareaAutosize
                  className={`${
                    errors.description &&
                    touched.description &&
                    "border-red px-3"
                  }`}
                  minRows={4}
                  style={{ borderRadius: "5px", padding: ".5rem .5rem" }}
                  maxRows={8}
                  placeholder="Description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.description && touched.description && (
                  <FormHelperText className="text-danger">
                    {errors.description}
                  </FormHelperText>
                )}
              </FormControl>
            </div>
            {/* _________ Product Category _________ */}
            <div className="form-field">
              <FormControl fullWidth variant="outlined">
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  name="category"
                  value={values.category}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setFieldValue("subCategory", "");
                    setFieldValue("sizes", []);
                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                  error={Boolean(errors.category && touched.category)}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
                {errors.category && touched.category && (
                  <p
                    className="text-danger mb-0 ms-2"
                    style={{ fontSize: "14px" }}
                  >
                    <ErrorMessage name="category" />
                  </p>
                )}
              </FormControl>
            </div>
            {/* _________ Sub Category _________ */}

            <div className="form-field">
              <FormControl fullWidth variant="outlined">
                <InputLabel>Sub Category</InputLabel>
                <Select
                  label="Sub Category"
                  name="subCategory"
                  value={values.subCategory}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.subCategory && touched.subCategory)}
                >
                  {subCategoriesMap[values.category].map((subCategory) => (
                    <MenuItem key={subCategory} value={subCategory}>
                      {subCategory}
                    </MenuItem>
                  ))}
                </Select>
                {errors.subCategory && touched.subCategory && (
                  <p className="text-danger ms-2" style={{ fontSize: "14px" }}>
                    <ErrorMessage name="subCategory" />
                  </p>
                )}
              </FormControl>
            </div>

            {/* ______________ Sizes ____________ */}
            {values.category === "Fashion" && (
              <div className="form-field">
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Sizes</InputLabel>
                  <Select
                    label="Sizes"
                    name="sizes"
                    multiple
                    value={values.sizes}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.sizes && touched.sizes)}
                  >
                    {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                      <MenuItem key={size} value={size}>
                        {size}
                      </MenuItem>
                    ))}
                  </Select>
                  <p className="text-danger ms-2" style={{ fontSize: "14px" }}>
                    <ErrorMessage name="sizes" />
                  </p>
                </FormControl>
              </div>
            )}
            {/* _________ Product Price _________ */}

            <div className="form-field">
              <TextField
                fullWidth
                variant="outlined"
                label="Price"
                name="price"
                value={values.price}
                onChange={handleChange}
                onBlur={() => {
                  setFieldValue(
                    "sellingPrice",
                    values.price - (values.price * values.discount) / 100
                  );
                }}
                error={Boolean(errors.price && touched.price)}
                helperText={<ErrorMessage name="price" />}
              />
            </div>

            {/* _________ Product Discount _________ */}

            <div className="form-field">
              <TextField
                fullWidth
                variant="outlined"
                label="Discount"
                name="discount"
                value={values.discount}
                onChange={(e) => {
                  handleChange(e);
                }}
                onBlur={() => {
                  setFieldValue(
                    "sellingPrice",
                    values.price - (values.price * values.discount) / 100
                  );
                }}
                error={Boolean(errors.discount && touched.discount)}
                helperText={<ErrorMessage name="discount" />}
              />
            </div>

            {/* _________ SELLING PRICE _________ */}

            <div className="form-field">
              <TextField
                fullWidth
                variant="outlined"
                label="Selling Price"
                name="sellingPrice"
                disabled
                value={values.sellingPrice}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.sellingPrice && touched.sellingPrice)}
                helperText={<ErrorMessage name="sellingPrice" />}
              />
            </div>

            {/* _________ Product Stock _________ */}
            <div className="form-field">
              <TextField
                fullWidth
                variant="outlined"
                label="Stock"
                name="stock"
                value={values.stock}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.stock && touched.stock)}
                helperText={<ErrorMessage name="stock" />}
              />
            </div>

            {/*  ____________ Pincodes ___________ */}
            <div className="form-field">
              <TextField
                fullWidth
                variant="outlined"
                label="Pincodes"
                name="pincodes"
                value={values.pincodes}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.pincodes && touched.pincodes)}
                helperText={<ErrorMessage name="pincodes" />}
              />

              <p className="text-secondary ms-2" style={{ fontSize: "14px" }}>
                "Leave empty for all India delivery - or - Separate pincodes
                with commas"
              </p>
            </div>

            {/* ___________Colors ________________ */}
            <div className="form-field">
              <FormControl fullWidth variant="outlined">
                <InputLabel>Colors</InputLabel>
                <Select
                  label="Colors"
                  name="colors"
                  multiple
                  value={values.colors}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {colors.map((color) => (
                    <MenuItem key={color} value={color}>
                      {color}
                    </MenuItem>
                  ))}
                </Select>
                <ErrorMessage name="colors" />
              </FormControl>
            </div>
            {/* _______________ Upload Images ___________________ */}
            <div className="form-field">
              <>
                {images.length < 3 && (
                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<PhotoCamera />}
                  >
                    {images.length === 0 ? "Upload Images" : "Upload More?"}
                    <input
                      type="file"
                      multiple
                      hidden
                      accept="image/*"
                      onChange={(e) => {
                        const files = Array.from(e.target.files);

                        const filteredFiles = files.filter(
                          (file) =>
                            !images.some((img) => file.name === img.name)
                        );
                        setImages((prevImages) => [
                          ...prevImages,
                          ...filteredFiles,
                        ]);
                        setFieldValue("images", [
                          ...values.images,
                          ...filteredFiles,
                        ]);
                      }}
                    />
                  </Button>
                )}

                <span className="ms-3">
                  {images.length}
                  {images.length <= 1 ? " image selected" : " images selected"}
                </span>

                {/* _________ Image Preview ___________ */}
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="image-preview">
                    {(provided) => {
                      return (
                        <div
                          className="image-preview"
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "10px",
                            marginTop: "10px",
                          }}
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {images?.map((img, index) => (
                            <Draggable
                              key={index}
                              draggableId={index.toString()}
                              index={index}
                            >
                              {(provided) => {
                                return (
                                  <div
                                    className="image-preview-item position-relative"
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                  >
                                    <img
                                      src={img}
                                      alt={`Image ${index + 1}`}
                                      className="preview-image"
                                      style={{
                                        width: "100px",
                                        height: "100px",
                                        objectFit: "contain",
                                        border: "1px solid #ccc",
                                        borderRadius: "5px",
                                      }}
                                    />
                                    <Clear
                                      className="remove-image position-absolute"
                                      style={{
                                        top: "5px",
                                        right: "5px",
                                        backgroundColor: "red",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "50%",
                                        width: "20px",
                                        height: "20px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        cursor: "pointer",
                                        fontSize: "15px",
                                      }}
                                      onClick={() => {
                                        const updatedImages = images.filter(
                                          (image) => image !== img
                                        );
                                        setImages(updatedImages);
                                        setFieldValue("images", updatedImages);
                                      }}
                                    />
                                  </div>
                                );
                              }}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </DragDropContext>
                <p className="mt-2 mb-1 ms-1 text-secondary">
                  you can only upload upto 3 images.{" "}
                </p>
              </>

              <p
                className="text-danger mb-0 mt-3 ms-2"
                style={{ fontSize: "14px" }}
              >
                <ErrorMessage name="images" />
              </p>
            </div>
            {/* _______________ Submit Button ___________________ */}
            <div className="form-field">
              <Button variant="contained" disabled={loading} type="submit">
                {loading ? "Updating Product..." : "Update Product"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProductOverlay;
