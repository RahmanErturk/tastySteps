import dotenv from "dotenv";
dotenv.config();

import User from "../models/User.js";

import passport from "passport";
import { Strategy } from "passport-google-oauth20";

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://tastysteps.onrender.com/api/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const user = await User.findOne({ googleId: profile.id });

        if (user) done(null, user);
        else {
          const newUser = await User.create({
            googleId: profile.id,
            provider: profile.provider,
            userName: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
            recipes: [],
            likedRecipes: [],
            shoppingList: [],
          });
          done(null, newUser);
        }
      } catch (err) {
        console.error(err);
        done(err, null);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
