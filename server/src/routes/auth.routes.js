import express from "express";
import { Register , login } from "../controllers/auth.controller.js";


const router = express.Router();

router.post("/register", Register);
router.post("/login" , login)

export default router;
