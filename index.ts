import express from "express";
import mongoose from "mongoose";
import { env } from "./config";
import { authRoutes } from "./routes";
import cookieSession from "cookie-session";
import passport from "passport";
import { initializePassport } from "./services";

mongoose.connect(env.MongoURI);
initializePassport();

const app = express();

app.use(cookieSession({ maxAge: 24 * 60 * 60 * 1000, keys: [env.cookieKey] }));
app.use(passport.session());

authRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});
