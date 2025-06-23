import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { env } from "../config";
import { IUser, User } from "../models";

export const initializePassport = () => {
  passport.serializeUser((user: IUser, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      console.error("Error deserializing user:", err);
      done(err, null);
    }
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: env.googleClientID,
        clientSecret: env.googleClientSecret,
        callbackURL: "/auth/google/callback",
        proxy: true,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const existingUser = await User.findOne({ googleId: profile.id });
          if (existingUser) return done(null, existingUser);

          // If user does not exist, create a new user
          const userDetails = new User({ googleId: profile.id });
          const user = await userDetails.save();
          return done(null, user);
        } catch (err) {
          console.error("Error saving user:", err);
          return done(err, null);
        }
      }
    )
  );
};
