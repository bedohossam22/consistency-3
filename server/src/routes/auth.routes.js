import express from "express";
import { Register, login , forgotPassword , resetPassword} from "../controllers/auth.controller.js";
import { validateRegister, validateLogin, handleValidationErrors } from "../utils/validators.js";

const router = express.Router();

router.post("/register", validateRegister , handleValidationErrors, Register);

router.post("/login", validateLogin, handleValidationErrors, login);


// Forgot Password
router.post("/forgot-password", forgotPassword);

// Reset Password
router.post("/reset-password/:token", resetPassword);


export default router;