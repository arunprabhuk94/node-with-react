import express from "express";
import Stripe from "stripe";
import { env } from "../config";
import { IUser } from "../models";

export const billingRouter = express.Router();
const stripe = new Stripe(env.stripeSecretKey);

billingRouter.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      description: "$5 for 5 credits",
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).send({ message: "Failed to create payment intent" });
  }
});

billingRouter.post("/status", async (req, res) => {
  if (!req.body.paymentIntentId) {
    res.status(400).send({ message: "PaymentIntentId is required" });
    return;
  }
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(
      req.body.paymentIntentId
    );
    if (paymentIntent.status === "succeeded" && req.user) {
      const user = req.user as IUser;
      user.credits += 5;
      await user.save();
    }
    res.send(paymentIntent);
  } catch (error) {
    console.error("Error fetching payment intents:", error);
    res.status(500).send({ message: "Failed to fetch payment intents" });
  }
});
