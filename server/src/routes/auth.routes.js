import express from "express";
import { Register, login } from "../controllers/auth.controller.js";
import { validateRegister, validateLogin, handleValidationErrors } from "../utils/validators.js";

const router = express.Router();

router.post("/register", validateRegister , handleValidationErrors, Register);

router.post("/login", validateLogin, handleValidationErrors, login);

export default router;