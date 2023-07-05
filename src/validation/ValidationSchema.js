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

  password: Yup.string()
    .min(8, "password should be 8 char long")
    .matches(/^(?=.*[0-9])/, "Password must contain a number")
    .required("Password is required"),
});

export { registerSchema, loginSchema };
