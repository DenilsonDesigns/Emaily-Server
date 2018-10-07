const passport = require("passport");

module.exports = app => {
  //GET- LOGIN FORM
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  //Callback after google verified
  app.get("/auth/google/callback", passport.authenticate("google"));

  //logout route
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });

  //view current user
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
