import Razorpay from "razorpay";
import crypto from "crypto";

const razorpayInstance = new Razorpay({
  key_id: "rzp_test_1Hx7smB3aOIDYu", // Use your Razorpay Key ID
  key_secret: "oexQe9OnKkJrJ8G5CHigsCsq", // Use your Razorpay Key Secret
});

export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  // Verify the signature to ensure the payment is genuine
  const generated_signature = crypto
    .createHmac("sha256", razorpayInstance.key_secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature === razorpay_signature) {
    // Signature matches, payment is successful
    try {
      // Here, you can update your database or wallet balance
      res.status(200).send("Payment Verified Successfully");
    } catch (err) {
      console.error("Error updating wallet", err);
      res.status(500).send("Internal Server Error");
    }
  } else {
    // Signature mismatch, payment verification failed
    res.status(400).send("Payment Verification Failed");
  }
};
