import passport from "passport";
import express from "express";

const authRoutes = express.Router();

authRoutes.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

authRoutes.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (_, res) => {
    res.redirect("/surveys");
  }
);

authRoutes.get("/api/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Error logging out:", err);
      return res.status(500).send("Logout failed");
    }
  });
  res.redirect("/");
});

authRoutes.get("/api/current_user", (req, res) => {
  res.send(req.user);
});

export { authRoutes };
