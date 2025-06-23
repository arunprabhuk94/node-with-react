import passport from "passport";
import { Express } from "express";

export const authRoutes = (app: Express) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        console.error("Error logging out:", err);
        return res.status(500).send("Logout failed");
      }
    });
    res.send({ message: "Logged out successfully" });
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
