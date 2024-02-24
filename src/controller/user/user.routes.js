import passport from "../../middleware/passport.js";
import UserController from "./user.controller.js";
import { Router } from "express";
// import Validate from "../../middleware/validate.middleware.js";
// import SignupSchema from "../../validators/auth.signupValidator.js";


const userRouter = Router();
const userController = new UserController();
//*------------------
//Signup Route
//*------------------
userRouter.post("/signup", (req, res) => {
  userController.signUp(req, res);
});
// userRouter.post("/signup", Validate(SignupSchema), (req, res) => {
//   userController.signUp(req, res);
// });
//*------------------
//Login Route
//*------------------
userRouter.post("/login", (req, res) => {
  userController.login(req, res);
});
//*------------------
//Login Route O Auth
//*------------------
userRouter.get("/login/success", (req, res) => {
  userController.loginSuccess(req, res);
});
//*------------------
//Logout Route O Auth
//*------------------
userRouter.get("/logout", (req, res) => {
  userController.logout(req, res);
});
//*------------------
//Route for posting user details
//*------------------
userRouter.post(
  "/personaldetail",
  // passport.authenticate(["jwt", "google"], { session: false }),
  (req, res) => {
    console.log("personal details ", req.body);
    userController.personalDetail(req, res);
  }
);
userRouter.put("/personaldetail/:userId", (req, res) => {
  userController.personalDetail(req, res);
});
userRouter.get("/personaldetail", (req, res) => {
  userController.userProfile(req, res);
});
// userRouter.get("/personaldetail", passport.authenticate("jwt", { session: false }), (req, res) => {
//     userController.userProfile(req, res);
//   }
// );
// "_id": "65c0ccf0ffddeda01057c6da",
export default userRouter; 

