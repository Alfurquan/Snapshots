const express = require("express");
const app = express();
const users = require("./routes/users");
const photos = require("./routes/photos");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const albums = require("./routes/albums");
const db = require("./config/keys").mongoURI;
var cors = require("cors");

app.use(cors());

//use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//connect to mongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("mongoDB connected");
  })
  .catch(ex => {
    console.log(ex);
  });
//passport middleware
app.use(passport.initialize());

//passport config
require("./config/passport")(passport);

app.use("/uploads", express.static("uploads"));
//config routes
app.use("/api/users", users);
app.use("/api/photos", photos);
app.use("/api/albums", albums);
app.get("/", (req, res) => {
  res.send("Hello");
});
const port = process.env.port || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
