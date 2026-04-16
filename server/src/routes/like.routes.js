import { likeUser } from "../controllers/like.controller.js";
import express from "express";
import protect from "../middleware/auth.middleware.js";
import { getMyLikes } from "../controllers/like.controller.js";

const router = express.Router();


router.post("/:id/like" , protect , likeUser );
router.get("/my-likes", protect, getMyLikes);


export default router;
 