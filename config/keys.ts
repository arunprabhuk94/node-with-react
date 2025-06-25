export const env = {
  environment: process.env.NODE_ENV || "development",
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  stripePubKey: process.env.STRIPE_PUB_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
};
