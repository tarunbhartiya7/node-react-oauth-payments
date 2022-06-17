const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      // res.redirect("/blogs");
      res.send(req.user);
    }
  );

  app.get("/auth/logout", (req, res) => {
    req.logout();
    res.send(req.user);
    // res.redirect('/');
  });

  app.get("/api/currentUser", (req, res) => {
    res.send(req.user);
  });
};
