import { body, validationResult } from "express-validator";

// Register validation
const validateRegister = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

 body("password")
  .isLength({ min: 6 })
  .withMessage("Password must be at least 6 characters")
  .matches(/[A-Z]/)
  .withMessage("Password must contain at least one uppercase letter"),

  body("age") 
    .isInt({ min: 18 })
    .withMessage("Age must be at least 18"),

  body("role")
    .isIn(["male", "female", "admin"])
    .withMessage("Role must be male, female, or admin")
];

// Login validation
const validateLogin = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
];

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  next();
};

export {
  validateRegister,
  validateLogin,
  handleValidationErrors
};