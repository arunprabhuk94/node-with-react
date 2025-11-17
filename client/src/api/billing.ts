import axios from "axios";

export const getPaymentIntentStatus = async (
  paymentIntentId: string | undefined
) => {
  try {
    await axios.post("/api/stripe/status", {
      paymentIntentId,
    });
  } catch (error) {
    console.error("Error fetching payment intent status:", error);
    throw error;
  }
};

export const createPaymentIntent = async () => {
  try {
    const response = await axios.post("/api/stripe/create-payment-intent", {
      amount: 500, // $5 for 5 credits
    });
    return response.data.clientSecret;
  } catch (error) {
    console.error("Error processing payment:", error);
    throw error;
  }
};
