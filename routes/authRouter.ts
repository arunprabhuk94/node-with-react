import passport from "passport";
import express from "express";
import { requireLogin } from "../middlewares";

export const authRouter = express.Router();

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google"),
  (_, res) => {
    res.redirect("/surveys");
  }
);

authRouter.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Error logging out:", err);
      return res.status(500).send({ message: "Logout failed" });
    }
  });
  res.redirect("/");
});

authRouter.get("/current_user", requireLogin, (req, res) => {
  res.send(req.user);
});
