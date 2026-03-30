import User from "../models/User.js";

// Get logged-in user profile
const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update user profile
const updateMyProfile = async (req, res) => {
  try {
    const { name, age } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (age) user.age = age;

    const updatedUser = await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        age: updatedUser.age,
        role: updatedUser.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Deactivate account
const deactivateAccount = async (req, res) => {
  try {

    const user = await User.findByIdAndDelete(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Account deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const likeUser = async ( req , res ) => {
  try {
    const currentUserId = req.body._id;
    const targetUserId = req.params.id;

    // prevent self-like
    if (currentUser.toString() === targetUser){
      return res.status(400).json({message : "You cannot like yourself"})
    }

    // check if target exists
    const targetUser = await User.findById(targetUserId);
    if (!targetUser){
        return res.status(400).json({message : "Cannont Find Uder"})
    }

    // get the current user
    const currentUser = await User.findById(currentUserId)

} catch {
  
}
}


export {
  getMyProfile,
  updateMyProfile,
  deactivateAccount
};