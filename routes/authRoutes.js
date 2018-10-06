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
};
