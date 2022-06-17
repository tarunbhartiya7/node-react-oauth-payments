const passport = require("passport");
const { googleClientId, googleClientSecret } = require("../config/keys");
const User = require("../models/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await User.findById(id);
  cb(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        cb(null, existingUser);
      } else {
        const user = await new User({ googleId: profile.id }).save();
        cb(null, user);
      }
    }
  )
);
