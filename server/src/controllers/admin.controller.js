import User from "../models/User.js";

const  getAllUsers = async ( req , res ) => {
try {
   const users = await User.find().select("-password");
    res.json(users)

}catch (error) {
    res.status(500).json({ message: error.message });
  }
}
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    await User.findByIdAndDelete(userId);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {getAllUsers , deleteUser};