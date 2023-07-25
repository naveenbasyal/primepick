import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createProductSchema } from "../../validation/ValidationSchema";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Clear, PhotoCamera } from "@mui/icons-material";
import { Toaster, toast } from "react-hot-toast";
import { Cancel } from "@material-ui/icons";

const CreateProduct = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [tags, setTags] = useState([]);
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

  const handleSubmit = (values) => {
    console.log(values);
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
              <TextField
                fullWidth
                variant="outlined"
                label="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.description && touched.description)}
                helperText={<ErrorMessage name="description" />}
              />
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
                    setSelectedSubCategory("");
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
                onKeyDown={(e) => {
                  if (e.key === "Enter" && tagValue) {
                    if (tags.includes(tagValue)) {
                      toast.error("Tag already exists");
                      return;
                    }
                    setTags([...tags, tagValue]);
                    setTagValue("");
                    setFieldValue("tags", [...tags, tagValue]);
                  }
                }}
                onBlur={handleBlur}
                error={Boolean(errors.tags && touched.tags)}
                helperText={<ErrorMessage name="tags" />}
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
                  error={Boolean(errors.colors && touched.colors)}
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
              <div>
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<PhotoCamera />}
                >
                  Upload Images
                  <input
                    type="file"
                    multiple
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      const imageDataUrls = [];
                      const readFile = (file, index) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = (event) => {
                          imageDataUrls[index] = event.target.result;
                          if (imageDataUrls.length === files.length) {
                            setFieldValue("images", imageDataUrls);
                          }
                        };
                      };
                      files.forEach((file, index) => readFile(file, index));
                    }}
                  />
                </Button>

                <span className="ms-3">
                  {values.images.length}
                  {values.images.length <= 1
                    ? " image selected"
                    : " images selected"}
                </span>
                {/* Image Preview */}
                {values.images.length <= 5 && (
                  <div className="image-preview">
                    {values.images.map((imageUrl, index) => (
                      <img
                        key={index}
                        src={imageUrl}
                        alt={`Image ${index + 1}`}
                        className="preview-image"
                      />
                    ))}
                  </div>
                )}
              </div>

              <p
                className="text-danger mb-0 mt-3 ms-2"
                style={{ fontSize: "14px" }}
              >
                <ErrorMessage name="images" />
              </p>
            </div>
            {/* _______________ Submit Button ___________________ */}
            <div className="form-field">
              <Button variant="contained" color="primary" type="submit">
                Create Product
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProduct;
