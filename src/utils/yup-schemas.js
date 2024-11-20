import * as Yup from "yup";

const passwordRules = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const phoneNumbers = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;

export const registrationScehma = Yup.object({
  username: Yup.string().required("Username is Required"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8)
    .matches(passwordRules, "Password must contain one letter or number"),
  confirmPassword: Yup.string()
    .required("Password is Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  phoneNumber: Yup.string()
    .matches(phoneNumbers, "Invalid Phone Number")
    .required("Phone number is required"),
  profilePic: Yup.mixed().nullable(), 
});

export const editUserName = Yup.object({
  username: Yup.string().required("Username is Required"),
});

export const editEmail = Yup.object({
  email: Yup.string().email("Invalid Email").required("Email is required"),
});

export const editPhone = Yup.object({
  phoneNumber: Yup.string()
    .matches(phoneNumbers, "Invalid Phone Number"),
});

export const editProfileScehma = Yup.object({
  username: Yup.string(),
  email: Yup.string().email("Invalid Email"),
  password: Yup.string()
    .min(8)
    .matches(passwordRules, "Password must contain one letter or number"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  phoneNumber: Yup.string()
    .matches(phoneNumbers, "Invalid Phone Number"),
  profilePic: Yup.mixed().nullable(), 
});

export const editScehma = Yup.object({
    username: Yup.string(),
    email: Yup.string().email("Invalid Email"),
    password: Yup.string()
      .min(8)
      .matches(passwordRules, "Password must contain one letter or number"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    phoneNumber: Yup.string()
      .matches(phoneNumbers, "Invalid Phone Number")
  });

export const loginScehma = Yup.object({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const editProfileSchema = {
  userName: Yup.object({
    username: Yup.string().required("Username is Required"),
  }),

  emailAddress: Yup.object({
    email: Yup.string().email("Invalid Email").required("Email is required"),
  }),

  phoneNumber: Yup.object({
    phone: Yup.string()
      .matches(phoneNumbers, "Invalid Phone Number")
      .required("Phone number is required"),
  }),

  passWord: Yup.object({
    password: Yup.string()
      .required("Password is required")
      .min(8)
      .matches(passwordRules, "Password must contain one letter or number"),
    confirmPassword: Yup.string()
      .required("Password is Required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  }),
};