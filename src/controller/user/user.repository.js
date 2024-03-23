import UserProfileModel from "./user.profileSchema.js";
import Usermodel from "./user.schema.js";

export default class UserRepository {
  
  //*------------------
  //Saving details in DB
  //*------------------
  async signUp(user) {
    try {
      const newUser = new Usermodel(user);
      await newUser.save();
      return newUser;
    } catch (error) {
      console.log("Error in userRepository signup", error);
    }
  }

  //*------------------
  //Matching email and password
  //*------------------
  async login(email, password) {
    try {
      return await Usermodel.findOne({
        email,
        password,
      });
    } catch (error) {
      console.log("Error in userRepository login", error);
    }
  }

  //*------------------
  //Saving user personal details
  //*------------------
  async personalDetail(user) {
    try {
      const newPersonalDetail = new UserProfileModel(user);
      await newPersonalDetail.save();
      console.log("Saved in DB",newPersonalDetail);
    } catch (error) {
      console.log(
        "Error in userRepository while saving userPersonalDetail ",
        error
      );
    }
  }

  async updateUser(userId, updatedUserData) {
    try {
      const user = await UserProfileModel.findByIdAndUpdate(
        userId,
        updatedUserData,
        { new: true } // Return the updated document
      );
      console.log("Update and Saved in DB", user);
      return user;
    } catch (error) {
      console.log(
        "Error in userRepository while saving userPersonalDetail ",
        error
      );
    }
  }

  // async userProfile(userID) {
  //   try {
  //     const userProfile = await Usermodel.findById(userID);
  //     if (userProfile) {
  //       (userProfile.lastname = lastname),
  //         (userProfile.gender = gender),
  //         (userProfile.date = date),
  //         (userProfile.address = address),
  //         await userProfile.save();
  //     } else {
  //       const profileDetails = new UserProfileModel({
  //         user:new ObjectId(userID),
  //         lastname,
  //         gender,
  //         date,
  //         address
  //       })
  //       await profileDetails.save()
  //     }
  //   } catch (error) {
  //     console.log("User details not found", error);
  //   }
  // }
}
