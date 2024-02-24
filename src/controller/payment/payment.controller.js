import PaymentRepository from "./payment.repository.js";
import PaymentModel from "./payment.schema.js";
import Razorpay from "razorpay";
import crypto from "crypto";

//creating instance of Razorpay
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZOR_API_SECRET,
});
export default class UserController {
  constructor() {
    this.paymentRepository = new PaymentRepository();
  }
  //creating order and sending to frontend
  async checkout(req, res) {
    const options = {
      amount: Number(req.body.price * 100), // amount in the smallest currency to rupee
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    const order = await instance.orders.create(options);
    console.log(order);
    if (!order) {
      return res.status(500).send("Error in order checkout");
    }
    res.status(200).json({ success: true, order });
  }
  //verifying payment when getting request from frontend and sending payment id
  async paymentVerification(req, res) {
    console.log(req.body);
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;
    const sha = crypto.createHmac("sha256", process.env.RAZOR_API_SECRET);
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if (digest !== razorpay_signature) {
      return res.status(400).json({ msg: "Transaction is not legit!" });
    } else {
      const paymentDetail = new PaymentModel({
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
      });
      await this.paymentRepository.paymentVerification(paymentDetail);
      res.redirect(
        `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
      );
    }
  }
  //sending key to frontend
  async key(req, res) {
    res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
  }
}

