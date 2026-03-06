import express from "express";
import protect from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

const router = express.Router();



const getMe = (req , res) => {

    res.json(req.user)

}


router.get("/me" , protect , getMe );
router.get("/admin" , protect , authorizeRoles ("admin") , (req , res) => {
        res.json({ message: "Welcome Admin" });

})


export default router;