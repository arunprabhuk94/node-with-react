import express from "express";
import mongoose from "mongoose";
import { env } from "./config";
import { authRouter, billingRouter } from "./routes";
import cookieSession from "cookie-session";
import passport from "passport";
import { initializePassport } from "./services";
import { requireLogin } from "./middlewares";
import path from "path";

mongoose.connect(env.mongoURI);
initializePassport();

const app = express();

app.use(express.json());
app.use(cookieSession({ maxAge: 24 * 60 * 60 * 1000, keys: [env.cookieKey] }));
app.use(passport.session());

app.use("/api/auth", authRouter);
app.use("/api/stripe", requireLogin, billingRouter);

app.use(express.static(path.resolve(__dirname, "../client/dist")));
app.get("/{*splat}", (_, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});
