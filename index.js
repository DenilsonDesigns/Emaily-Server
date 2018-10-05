const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send({ hi: "there2" });
});

//SERVER SETUP
const PORT = process.env.PORT || 5000;
app.listen(PORT);

//heroku url: https://nameless-refuge-83138.herokuapp.com/
