import PaymentModel from "./payment.schema.js";

export default class PaymentRepository {
  //saving the payment details
  async paymentVerification(paymentDetail) {
    try {
      const newPayment = new PaymentModel(paymentDetail);
      await newPayment.save();
      return newPayment;
    } catch (error) {
      console.log("Error in saving new Payment ", error);
    }
  }
}
