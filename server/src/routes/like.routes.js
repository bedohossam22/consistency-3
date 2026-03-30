import { likeUser } from "../controllers/user.controller.js";
import express from "express";
import protect from "../middleware/auth.middleware.js";


const router = express.Router();


router.post("/:id/like" , protect , likeUser );

export default router;
