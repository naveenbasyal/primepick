import * as Yup from "yup";

const registerSchema = Yup.object({
  username: Yup.string()
    .min(3, "Name too short")
    .max(25, "Name too long")
    .matches(/^[^\d]*$/, "Name can't contain numbers")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be 8 char long")
    .matches(/^(?=.*[0-9])/, "Password must contain a number")
    .required("Password is required"),
});

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string().required("Password is required"),
});

// ________________ Seller Login Schema ________________
const sellerLoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

//  ________________ Seller Register Schema ________________
const sellerRegisterSchema = Yup.object({
  shopName: Yup.string().min(3, "Name too short").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be 8 char long")
    .matches(/^(?=.*[0-9])/, "Password must contain a number")
    .required("Password is required"),
  phone: Yup.string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .required("Phone number is required"),
  // zipcode: Yup.string()
  //   .min(6, "Zipcode must be 6 digits")
  //   .max(6, "Zipcode must be 6 digits")
  //   .required("Zipcode is required"),
  // address: Yup.string()
  //   .min(3, "Address too short")
  //   .required("Address is required"),
});

//  _______________ Seller Basic Details Edit Overlay ______________
const sellerBasicDetailsSchema = Yup.object({
  shopName: Yup.string()
    .min(3, "Must be 3 characters or more")
    .required("Required"),
  description: Yup.string()
    .min(10, "Must be 10 characters or more")
    .required("Required"),
  address: Yup.string()
    .min(8, "Must be 8 characters or more")
    .required("Required"),
  location: Yup.string()
    .min(5, "Must be 5 characters or more")
    .required("Required"),
  phone: Yup.string()
    .min(10, "Must be 10 characters or more")
    .required("Required"),
});

//  ___________________ Create Product Schema ___________________
const createProductSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required"),
  discount: Yup.number()
    .typeError("Discount must be a number")
    .required("Discount is required"),
  stock: Yup.number()
    .typeError("Stock must be a number")
    .required("Stock is required"),
  colors: Yup.array()
    .min(1, "Select at least one color")
    .required("Colors are required"),
  images: Yup.array()
    .min(1, "Upload at least one image")
    .required("Images are required"),
});
export {
  registerSchema,
  loginSchema,
  sellerLoginSchema,
  sellerRegisterSchema,
  sellerBasicDetailsSchema,
  createProductSchema
};
