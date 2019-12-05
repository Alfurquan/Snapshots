const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Album = require("../models/albums");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
var sharp = require("sharp");
const fs = require("fs");
const multer = require("multer");
const passport = require("passport");
const validateRegisterInput = require("../validator/register");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/profilepics");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  }
});
const upload = multer({
  storage: storage,
  fileFilter: function(req, file, callback) {
    if (
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpg" &&
      file.mimetype !== "image/jpeg"
    ) {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});

//Route for registering the users
router.post("/register", upload.single("profileImage"), async (req, res) => {
  let errors1 = {};
  console.log(req.file);
  if (req.file === undefined) {
    return res.status(400).json({ noProfileImage: "Profile image is reuired" });
  }
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    errors1.email = "user with given email already exists";
    res.status(400).json(errors);
  } else {
    var outputPath =
      "./uploads/profilepics/" +
      new Date().toISOString().replace(/:/g, "-") +
      req.file.originalname;
    sharp(req.file.path)
      .resize(250, 250)
      .toFile(outputPath);
    const newUser = new User({
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      profileImage: outputPath,
      password: req.body.password
    });
    console.log(newUser);
    try {
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(newUser.password, salt);
      await newUser.save();
      res.json(newUser);
    } catch (ex) {
      console.log(ex);
    }
  }
});

//Route for logging users
router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log("email", email);
  console.log("password", password);
  const user = await User.findOne({ email: email });
  if (!user) return res.status(404).json({ email: "User not found" });

  const ress = await bcrypt.compare(password, user.password);
  if (!ress) {
    return res.status(400).json({ password: "password not matching" });
  }

  //user matched
  const payload = { id: user.id, name: user.firstname };
  console.log("payload", payload);
  //sign token
  jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
    res.json({
      token: "Bearer " + token,
      expiresIn: "3600"
    });
  });
});

//route to send a user based on albumId
router.get("/:id", async (req, res) => {
  const album = await Album.findById(req.params.id);
  console.log("album", album);
  var userId = album.user;
  console.log("userId", userId);
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ err: "User not Found" });

  return res.json(user);
});

//route to get current user
router.get("/current/:id", async (req, res) => {
  var user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ err: "User not found" });

  return res.json(user);
});

//route to edit a particular user
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  upload.single("profileImage"),
  async (req, res) => {
    const user = await User.findById(req.params.id);
    console.log("user found", user);
    if (!user) return res.status(404).json({ notFound: "User not found" });

    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.username = req.body.username;
    user.email = req.body.email;

    if (req.file != undefined) {
      var outputPath =
        "./uploads/profilepics/" +
        new Date().toISOString().replace(/:/g, "-") +
        req.file.originalname;
      sharp(req.file.path)
        .resize(250, 250)
        .toFile(outputPath);

      user.profileImage = outputPath;
    }
    const result = await user.save();
    res.json(result);
  }
);

//route to get all the albums of a user
router.get("/albums/:id", async (req, res) => {
  var albums = await Album.find({ user: req.params.id });

  if (!albums) return res.status(404).json({ err: "No albums found" });

  return res.json(albums);
});
module.exports = router;
