import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    googleId: String,
    name: String,
    mobilenumber: Number,
    email: { type: String, unique: true, set: (value) => value.toLowerCase() },
    password: String,
    selectedOption: String,
    image: String,
    profileID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Userprofile",
    },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);
