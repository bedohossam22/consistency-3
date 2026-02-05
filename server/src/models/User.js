import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // ===============================
    // 1. Account & Identity
    // ===============================
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["male", "female", "guardian", "admin"],
      required: true,
    },

    // ===============================
    // 2. Marriage Profile (Core)
    // ===============================
    age: {
      type: Number,
      required: true,
    },

    height: String,
    weight: String,
    skinColor: String,

    education: String,
    job: String,
    financialStatus: String,

    religionCommitment: {
      type: String,
      enum: ["Prefer not to say", "Commited", "Very Commited"],
    },

    wantsChildren: Boolean,
    acceptsPolygamy: Boolean,

    hijab: Boolean, // for females
    smoking: Boolean,
    listensToMusic: Boolean,

    description: {
      type: String,
      maxLength: 1000,
    },

    // ===============================
    // 3. Images (Controlled)
    // ===============================
    profileImage: {
      type: String, // cloudinary URL
    },

    imageApproved: {
      type: Boolean,
      default: false, // admin or guardian must approve
    },

    // ===============================
    // 4. Account Status
    // ===============================
    isActive: {
      type: Boolean,
      default: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
