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

    hijab: Boolean,
    smoking: Boolean,
    listensToMusic: Boolean,

    description: {
      type: String,
      maxLength: 1000,
    },

    // ===============================
    // 3. Images
    // ===============================
    profileImage: {
      type: String,
    },

    imageApproved: {
      type: Boolean,
      default: false,
    },

    // ===============================
    // 4. Password Reset
    // ===============================
    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpire: {
      type: Date,
    },

    // ===============================
    // 5. Status
    // ===============================
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);