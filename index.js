const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
require("./models/Survey");
require("./models/User");
require("./services/passport");
const keys = require("./config/keys");

//conect mongoose to mongoDB
mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

app.use(
  cookieSession({
    //30 days
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

//Require routes
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

//Behaviour for production env.
if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  //like our main.js file, or main.css file
  app.use(express.static("client/build"));
  //Express will serve index.html file if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//////////////////
///SERVER SETUP///
//////////////////
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port:${PORT}`);
});

//heroku url: https://nameless-refuge-83138.herokuapp.com/
