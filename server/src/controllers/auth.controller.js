import crypto from "crypto";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";
import generateToken from "../utils/jwt.js";



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
      const token = generateToken(user._id);

res.status(200).json({
  message: "Logged in successfully",
  token,
});
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

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // generate token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // hash token and save to DB
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 min

    await user.save();

    // create reset URL (for now just console/test)
    const resetURL = `http://localhost:5000/api/auth/reset-password/${resetToken}`;

    // send email
    await sendEmail(
      user.email,
      "Password Reset",
      `Reset your password using this link: ${resetURL}`
    );

    res.json({ message: "Reset email sent" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;

    // hash token from URL
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // update password
    user.password = await bcrypt.hash(password, 10);

    // remove reset fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export {
  Register,
  login,
  forgotPassword,
  resetPassword
};