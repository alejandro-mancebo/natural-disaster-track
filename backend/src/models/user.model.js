import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please password is required"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: [true, "Please role is required"],
    },
    refreshToken: [String],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
