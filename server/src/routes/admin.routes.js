import express from "express";
import protect from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";
import User from "../models/User.js";

const router = express.Router();


// admin only one gets access tto all users.

router.get('/users' , protect , authorizeRoles("admin") , async (req , res) => {
   try {
        const users = await User.find().select("-password"); 
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
})

router.delete('/user/:id' , protect , authorizeRoles("admin") , (req , res) => {
     res.json({ message: "Delete user" });
})

export default router;