import User from "../models/User.js";
import bcrypt from "bcryptjs";

const Register = async (req, res) => {
  try {
const { name, email, password, role, age } = req.body;

    // ❗ Block admin signup
    if (role === "admin") {
      return res.status(403).json({ message: "Cannot register as admin" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

 const user = new User({
  name,
  email,
  password: hashedPassword,
  role,
  age,
});

    await user.save();   

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req , res) => {
  try {
    const {email , password} = req.body;
    const user =  await User.findOne({email});
    if(user){
      const isMatch = await bcrypt.compare(password , user.password)
      if(isMatch){
      res.status(200).json({ message: "logged in sucessfully"})
    } else {
            res.status(401).json({ message: "Incorrect passowrd"})

    }
  
  } else {
   
      res.status(404).json({ message: "username not found "})
   
  }
    }

  catch (error){
    res.status(500).json({message: error.message})
  }
}

export  {Register , login};