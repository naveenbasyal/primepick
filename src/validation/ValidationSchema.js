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
  password: Yup.string()
    .min(8, "Password must be 8 char long")
    .matches(/^(?=.*[0-9])/, "Password must contain a number")
    .required("Password is required"),
});

//  ________________ Seller Register Schema ________________
const sellerRegisterSchema = Yup.object({
  name: Yup.string().min(3, "Name too short").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be 8 char long")
    .matches(/^(?=.*[0-9])/, "Password must contain a number")
    .required("Password is required"),
  phone: Yup.string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .required("Phone number is required"),
  zipcode: Yup.string()
    .min(6, "Zipcode must be 6 digits")
    .max(6, "Zipcode must be 6 digits")
    .required("Zipcode is required"),
  address: Yup.string()
    .min(3, "Address too short")
    .required("Address is required"),
});

export { registerSchema, loginSchema, sellerLoginSchema, sellerRegisterSchema };
