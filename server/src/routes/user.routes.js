import express from "express";
import protect from "../middleware/auth.middleware.js";


const router = express.Router();
const getMe = (req , res) => {

    res.json(req.user)

}


router.get("/me" , protect , getMe );

export default router;