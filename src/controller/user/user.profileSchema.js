
import mongoose from "mongoose";

export const personalDetailSchema = new mongoose.Schema(
  {
    image:String,
    firstname:String,
    lastname: String,
    email: String,
    date: Date,
    gender: String,
    profession: String,
    address: String,
  },
  { timestamps: true }
);

const UserProfileModel = mongoose.model("Userprofile", personalDetailSchema);
export default UserProfileModel;
