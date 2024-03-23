import UserRepository from "./user.repository.js";
import jwt from "jsonwebtoken";
import Usermodel from "./user.schema.js";
import UserProfileModel from "./user.profileSchema.js";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  //*------------------
  //Signup Logic
  //*------------------
  async signUp(req, res, next) {
    console.log("signup req.body ", req.body);
    const { mobilenumber, email, password, selectedOption, id, name, image, isAdmin } =
      req.body;
    const userExist = await Usermodel.findOne({ email });
    if (userExist) {
      return res.status(400).send({ message: "email already exists" });
    }
    const user = new Usermodel({
      mobilenumber,
      email,
      password,
      selectedOption,
      id,
      name,
      image,
      isAdmin
    });
    await this.userRepository.signUp(user);
    res.status(201).send({ message: "Sign up Successfull", user: user });
  }

  
  //*------------------
  //Login Logic
  //*------------------
  async login(req, res, next) {
    console.log("login req.body ", req.body);
    const user = await this.userRepository.login(
      req.body.email,
      req.body.password
    );
    console.log("user", user);
    if (!user) {
      return res.status(400).send({ message: "Incorrect Credentials" });
    } else {
      const token = jwt.sign(
        { userId: user._id, email: user.email, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      // console.log("login Successfull token", token);
      const decodedToken = jwt.decode(token);
      console.log('Token contains userId:', decodedToken);
      return res
        .status(200)
        .send({ message: "Login Successfull", token: token, userId:user._id });
    }
  }

  //*-------------------------
  //user Personal details page
  //*-------------------------
  async personalDetail(req, res) {
    console.log("personalDetail ", req.body);
    const {
      image,
      firstname,
      lastname,
      email,
      date,
      gender,
      profession,
      address,
    } = req.body;
    // Check if userId is present in the request params
    const userId = req.params.userId;
    let user;
    if (userId) {
      // If userId is present, update existing user
      user = await this.userRepository.updateUser(userId, {
        image,
        firstname,
        lastname,
        email,
        date,
        gender,
        profession,
        address,
      });
      res
        .status(201)
        .send({ message: "UserDetail update successfull", user: user });
    } else {
      user = new UserProfileModel({
        image,
        firstname,
        lastname,
        email,
        date,
        gender,
        profession,
        address,
      });
      await this.userRepository.personalDetail(user);
      res
        .status(201)
        .send({ message: "UserDetail saved successfull", user: user });
    }
  }
  //*------------------------------------------------------------------
  //todo NOTE -> login with o Auth and getting a user data in frontend
  //*------------------------------------------------------------------
  async loginSuccess(req, res) {
    console.log("O Auth login success response ", req.user);
    if (req.user) {
      res
        .status(200)
        .json({ message: "O Auth User Login Success", user: req.user });
      console.log("Success in backend");
    } else {
      console.log("Fail in backend");
      res.status(400).json({ message: "Not Authorized" });
    }
  }

  //todo NOTE -> logout with o Auth
  async logout(req, res, done) {
    req.logout(function (err) {
      if (err) {
        return done(err);
      }
      res.redirect("http://localhost:3000/");
    });
  }
}

