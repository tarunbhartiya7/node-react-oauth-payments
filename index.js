const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const { mongoURI, cookieKey } = require("./config/keys");
const authRoutes = require("./routes/authRoutes");

require("./services/passport");

const PORT = process.env.PORT || 5002;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
