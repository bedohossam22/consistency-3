import User from "../models/User.js";


const likeUser = async (req, res) => {
  try {
    const currentUserId = req.user._id; 
    const targetUserId = req.params.id;

    //  Prevent self-like
    if (currentUserId.toString() === targetUserId) {
      return res.status(400).json({ message: "You cannot like yourself" });
    }

    //  Check if target user exists
    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }
    //  Get current user
    const currentUser = await User.findById(currentUserId);

    // prevent gay ass niggas
    if(targetUser.role === currentUser.role){
        return res.status(400).json({ message: "You can only like users of the opposite gender... this is not a gay ass website please...." });
    }

    //  Check if already liked

    const alreadyLiked = currentUser.likes.some(
      (id) => id.toString() === targetUserId
    );
  // do unlike 
    if (alreadyLiked) {
      //  UNLIKE
      currentUser.likes = currentUser.likes.filter(
        (id) => id.toString() !== targetUserId
      );
 
      await currentUser.save();

      return res.json({ message: "User unliked successfully" });
    } else {
      //  LIKE
      currentUser.likes.push(targetUserId);

      await currentUser.save();

      return res.json({ message: "User liked successfully" });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyLikes = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("likes", "name email age")
      .select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      likes: user.likes
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { likeUser, getMyLikes };