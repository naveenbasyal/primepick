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
import { Add, AddAPhoto, Clear, PhotoCamera } from "@mui/icons-material";
import { Toaster, toast } from "react-hot-toast";
import { SellerContext } from "../../Context/SellerProvider";
import { FormHelperText, TextareaAutosize } from "@material-ui/core";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";

const CreateProduct = () => {
  // ________ Context _______
  const { getSellerProducts } = useContext(SellerContext);
  // __________ States __________
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const initialValues = {
    name: "",
    description: "",
    category: "",
    subCategory: "",
    price: "",
    discount: 0,
    sellingPrice: "",
    tags: [],
    sizes: [],
    stock: "",
    productDetails: "",
    pincodes: [""],
    colors: [],
    images: [],
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
      values.pincodes = "All India Delivery";
    } else if (values.pincodes.includes(",")) {
      values.pincodes = values.pincodes.split(",");
    }

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
    formData.append("tags", values.tags);
    for (let i = 0; i < values.sizes.length; i++) {
      formData.append("sizes", values.sizes[i]);
    }
    for (let i = 0; i < values.colors.length; i++) {
      formData.append("colors", values.colors[i]);
    }
    formData.append("stock", values.stock);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}api/store/createproduct`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("primepick-seller")
            )}`,
          },
        }
      );
      const data = await res.json();

      if (data.msg === "Product created successfully.") {
        toast.success("Product created successfully");
        resetForm();
        setTags([]);
        setImages([]);
        setTagValue("");
        setSelectedCategory("");
      }
      setLoading(false);
      getSellerProducts();
    } catch (err) {
      console.log(err);
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
      <h3 className="centerh">Create Product</h3>
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
          <Form>
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
              <InputLabel>Product Description</InputLabel>
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
            {/* _________ Product Details _________ */}
            <div className="mb-3 mt-1">
              <InputLabel>Product Details</InputLabel>
              <FormControl
                fullWidth
                error={Boolean(errors.productDetails && touched.productDetails)}
              >
                <ReactQuill
                  theme="snow"
                  value={values.productDetails}
                  onChange={(content) =>
                    setFieldValue("productDetails", content)
                  }
                />
                {errors.productDetails && touched.productDetails && (
                  <FormHelperText className="text-danger">
                    {errors.productDetails}
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
            {selectedCategory && (
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
                    {subCategoriesMap[selectedCategory].map((subCategory) => (
                      <MenuItem key={subCategory} value={subCategory}>
                        {subCategory}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.subCategory && touched.subCategory && (
                    <p
                      className="text-danger ms-2"
                      style={{ fontSize: "14px" }}
                    >
                      <ErrorMessage name="subCategory" />
                    </p>
                  )}
                </FormControl>
              </div>
            )}
            {/* ______________ Tags ____________ */}
            <div className="form-field">
              <TextField
                fullWidth
                variant="outlined"
                name="tags"
                label="Tags"
                value={tagValue}
                onChange={(e) => {
                  setTagValue(e.target.value);
                  handleChange(e);
                }}
                onBlur={handleBlur}
                error={Boolean(errors.tags && touched.tags)}
                helperText={"Tags are necessary for better search results"}
                InputProps={{
                  endAdornment: (
                    <Add
                      style={{
                        cursor: "pointer",
                        backgroundColor: "#f3f3f3",
                        fontSize: "2rem",
                        borderRadius: "4px",
                      }}
                      onClick={() => {
                        if (tagValue) {
                          if (tags.includes(tagValue)) {
                            toast.error("Tag already exists");
                            return;
                          }
                          setTags([...tags, tagValue]);
                          setTagValue("");
                          setFieldValue("tags", [...tags, tagValue]);
                        }
                      }}
                    />
                  ),
                }}
              />

              {/*  _____________ Tags Mapping ____________ */}
              <div className="tags my-2 d-flex flex-wrap">
                {tags.map((tag, index) => {
                  return (
                    <span
                      key={index}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <span className="tag m-2">
                        {tag}

                        <span
                          className="removeTag"
                          onClick={() => {
                            const newTags = tags.filter((t) => t !== tag);
                            setTags(newTags);
                            setFieldValue("tags", newTags);
                          }}
                        >
                          <Clear />
                        </span>
                      </span>
                    </span>
                  );
                })}
              </div>
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
            <div
              className="row justify-content-between"
              style={{ height: "inherit" }}
            >
              <div
                className="col-lg-6 col-md-6 col-sm-12 ps-0"
                style={{ backgroundColor: "#fff" }}
              >
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
              </div>
              {/* _________ Product Discount _________ */}
              <div
                className="col-lg-6 col-md-6 col-sm-12 pe-0"
                style={{ backgroundColor: "#fff" }}
              >
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
              </div>
            </div>
            <div className="row" style={{ height: "inherit" }}>
              {/* _________ SELLING PRICE _________ */}
              <div
                className="col-lg-6 col-md-6 col-sm-12 ps-0"
                style={{ backgroundColor: "#fff" }}
              >
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
              </div>
              {/* _________ Product Stock _________ */}
              <div
                className="col-lg-6 col-md-6 col-sm-12 pe-0"
                style={{ backgroundColor: "#fff" }}
              >
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
              </div>
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
                helperText={
                  values.pincodes.length === 0 ? (
                    "Leave empty for all India delivery - or - Separate pincodes with commas"
                  ) : (
                    <ErrorMessage name="pincodes" />
                  )
                }
              />
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
                {images.length < 1 && (
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
                        const oversizedFiles = filteredFiles.filter(
                          (file) => file.size <= 3 * 1024 * 1024
                        );

                        if (oversizedFiles.length < filteredFiles.length) {
                          toast.error("Image should be less than 3MB.");
                          return;
                        }

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
                <div className="d-flex align-items-center">
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="image-preview">
                      {(provided) => {
                        return (
                          <div
                            className="image-preview"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {images.map((imageUrl, index) => (
                              <Draggable
                                key={index}
                                draggableId={index.toString()}
                                index={index}
                              >
                                {(provided) => {
                                  return (
                                    <div
                                      className="image-preview-item"
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      ref={provided.innerRef}
                                    >
                                      <img
                                        src={URL.createObjectURL(imageUrl)}
                                        alt={`Image ${index + 1}`}
                                        className="preview-image"
                                      />
                                      <Clear
                                        className="remove-image"
                                        onClick={() => {
                                          const updatedImages = images.filter(
                                            (img) => img.name !== imageUrl.name
                                          );
                                          setImages(updatedImages);
                                          setFieldValue(
                                            "images",
                                            updatedImages
                                          );
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
                  {images.length >= 1 && images.length <= 2 && (
                    <Button
                      title="Add more image"
                      variant="contained"
                      component="label"
                      style={{ height: "2rem", marginLeft: "2rem" }}
                    >
                      <AddAPhoto />
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
                          const oversizedFiles = filteredFiles.filter(
                            (file) => file.size <= 3 * 1024 * 1024
                          );
                          if (oversizedFiles.length < filteredFiles.length) {
                            toast.error("Image should be less than 3MB.");
                            return;
                          }
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
                </div>

                <p className="mt-2 mb-1 ms-1 text-secondary">
                  you can only upload upto 3 images and Image size must be less
                  than 3MB.
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
                {loading ? "Creating Product..." : "Create Product"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProduct;
