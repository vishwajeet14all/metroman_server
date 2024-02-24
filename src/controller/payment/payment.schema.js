import mongoose from "mongoose";

export const paymentSchema = new mongoose.Schema(
  {
    username:String,
    name:String,
    amount:String,
    order_id:String,
    razorpay_payment_id:String,
    razorpay_order_id:String,
    razorpay_signature: String, 
  },
  { timestamps: true }
);
//collection name PaymentDetail
const PaymentModel = mongoose.model("PaymentDetail", paymentSchema);
export default PaymentModel


