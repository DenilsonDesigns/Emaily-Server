const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");

//cookiefy user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//pull out user cookie
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      //Check if user already exists
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        //We already have this user
        return done(null, existingUser);
      }
      //No user exists with this id, make new record
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
