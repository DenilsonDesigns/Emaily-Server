const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./models/User");
require("./services/passport");
const keys = require("./config/keys");

//conect mongoose to mongoDB
mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

//Require auth routes
require("./routes/authRoutes")(app);

//////////////////
///SERVER SETUP///
//////////////////
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port:${PORT}`);
});

//heroku url: https://nameless-refuge-83138.herokuapp.com/
