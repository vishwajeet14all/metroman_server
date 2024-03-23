import dotenv from "dotenv";
dotenv.config();
import express from "express";
import ConnectUsingMongoose from "./src/config/mongoose.js";
import path from "path";
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const server = express();
import userRouter from "./src/controller/user/user.routes.js";
import productRouter from "./src/controller/product/product.routes.js";
import paymentRouter from "./src/controller/payment/payment.routes.js";
import cors from "cors";
import passport from "./src/middleware/passport.js";
import session from "express-session";
import errorMiddleware from "./src/middleware/error.middleware.js";


//*------------------
// CORS policy configuration
//*------------------
server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
//*------------------
// Serve static files from the 'build' directory
//*------------------
const staticPath = path.join(__dirname, "../client", "build");
console.log("Static files path:", staticPath);
server.use(express.static(staticPath));

//*------------------
// middleware for parsing JSON data from the request body.
//*------------------
server.use(express.json());

//*------------------
//middleware for dealing with HTML form submissions, enabling you to access form data in your Express
//*------------------
server.use(express.urlencoded({ extended: true }));

//*------------------
//setup session
//*------------------
server.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

//*------------------
//setup passport
//*------------------
server.use(passport.initialize());
server.use(passport.session());

//*------------------
// initial google oauth login page setup
//*------------------
server.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
server.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/personaldetail",
    failureRedirect: "http://localhost:3000/login",
  })
);

//*------------------
//all requests
//*------------------
server.use("/api/products", productRouter);
server.use("/api/users", userRouter);
server.use("/api/payment", paymentRouter);
// server.use("/api/cart", cartRouter);
// server.use("/api/admin", adminRouter);

//*------------------
//404 page
//*------------------
server.use((req, res) => {
  return res.status(404).send({ message: "Page not found" });
});

//*------------------
//Global error middleware
//*------------------
server.use(errorMiddleware);

//*------------------
//Specify port and connecting with DB
//*------------------
const PORT = process.env.PORT || 8000;
ConnectUsingMongoose().then(() =>
  server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  })
);

