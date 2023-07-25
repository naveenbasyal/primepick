import React from "react";
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
import { PhotoCamera } from "@mui/icons-material";

const CreateProduct = () => {
  const initialValues = {
    name: "",
    description: "",
    category: "",
    price: "",
    discount: "",
    stock: "",
    colors: [],
    images: [],
  };

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
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.category && touched.category)}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
                <p className="text-danger ms-2" style={{ fontSize: "14px" }}>
                  <ErrorMessage name="category" />
                </p>
              </FormControl>
            </div>
            {/* _________ Product Price _________ */}
            <div className="form-field">
              <TextField
                fullWidth
                variant="outlined"
                label="Price"
                name="price"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
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
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.discount && touched.discount)}
                helperText={<ErrorMessage name="discount" />}
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

                <span className="ms-2">
                  {values.images.length}
                  {values.images.length <= 1
                    ? " image selected"
                    : " images selected"}
                </span>
              </div>

              <ErrorMessage name="images" />
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
