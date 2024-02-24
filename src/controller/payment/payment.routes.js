import passport from "../../middleware/passport.js";
import PaymentController from "./payment.controller.js";
import { Router } from "express";

const paymentRouter = Router();
const paymentController = new PaymentController();

paymentRouter.post("/checkout", (req, res) => {
  paymentController.checkout(req, res);
});

paymentRouter.post("/paymentverification", (req, res) => {
  paymentController.paymentVerification(req, res);
});

paymentRouter.get("/key", (req, res) => {
  paymentController.key(req, res);
});

export default paymentRouter;
