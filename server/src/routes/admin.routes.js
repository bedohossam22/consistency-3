import express from "express";
import protect from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";
import { getAllUsers, deleteUser } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/users", protect, authorizeRoles("admin"), getAllUsers);

router.delete("/user/:id", protect, authorizeRoles("admin"), deleteUser);

export default router;