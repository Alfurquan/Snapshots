const express = require("express");
const router = express.Router();

const Album = require("../models/albums");
const Photo = require("../models/photos");
const mongoose = require("mongoose");
const passport = require("passport");
const multer = require("multer");
const auth = require("../middlewares/auth");
const fs = require("fs");
const validateCreateAlbumInput = require("../validator/create-album");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
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

//Route to create a new Album
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("coverImage"),
  async (req, res) => {
    var pri;

    console.log("entered");
    if (req.file === undefined) {
      return res.status(400).json({ noCoverImage: "Cover Image is required" });
    }

    const { errors, isValid } = validateCreateAlbumInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    if (req.body.privacy == "") {
      pri = "public";
    } else {
      pri = req.body.privacy;
    }
    console.log("pri", pri);
    const newAlbum = new Album({
      title: req.body.title,
      description: req.body.description,
      coverImage: req.file.path,
      user: req.user.id,
      privacy: pri
    });

    newAlbum.save().then(photo => {
      res.json(photo);
    });
  }
);
//Route to get all the albums
router.get("/", auth, async (req, res) => {
  //console.log("user", req.user);
  //if user not logged in send all the public and shareable albums...
  if (req.user === null) {
    const albums = await Album.find({ privacy: "public" }).sort({ date: -1 });
    return res.json(albums);
  }
  //send the public albums plus his private ones
  const albums = await Album.find()
    .or([
      { privacy: "public" },
      { privacy: "shareable", user: req.user.id },
      { privacy: "private", user: req.user.id }
    ])
    .sort({ date: -1 });
  //console.log(albums);
  res.json(albums);
});

//Route to get album by Id
router.get("/:id", auth, async (req, res) => {
  console.log(req.params.id);

  const album = await Album.findById(req.params.id);
  console.log(album);
  console.log("user1", req.user);
  if (req.user === null) {
    if (album.privacy == "private")
      return res.status(404).json({ notfound: "Album  not found" });
    else return res.json(album);
  } else {
    if (album.privacy == "private") {
      if (album.user == req.user.id) {
        return res.json(album);
      } else {
        return res.status(404).json({ notfound: "Album  not found" });
      }
    } else {
      return res.json(album);
    }
  }
});
//Route to update an album
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  upload.single("coverImage"),
  async (req, res) => {
    console.log("body", req.body);
    const album = await Album.findById(req.params.id);
    if (!album)
      return res.status(404).json({ notfound: "Album does not exists" });
    album.title = req.body.title;
    album.description = req.body.description;
    album.privacy = req.body.privacy;
    if (req.file !== undefined) {
      album.coverImage = req.file.path;
    }

    const result = await album.save();
    res.json(result);
  }
);

//Route to delete an album
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log(req.params.id);
    const album = await Album.findById(req.params.id);
    console.log(album.title);
    console.log(album.user);
    console.log(req.user.id);
    const albumImage = album.coverImage;
    const photos = await Photo.find({ album: album._id });
    console.log("photos", photos);
    if (album.user.toString() != req.user.id) {
      return res.status(401).json({ unauthorized: "user not authorized" });
    } else {
      //delete the album

      for (var i = 0; i < photos.length; i++) {
        var photoImage = photos[i].photoImage;
        fs.unlink(photoImage, err => {
          console.log(err);
        });
      }
      fs.unlink(albumImage, err => {
        console.log(err);
      });
      album.remove().then(() => {
        res.json({ success: true });
      });
    }
  }
);
//Route to like albums
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log("user", req.user.id);
    const album = await Album.findById(req.params.id);
    //checking if user has already liked the post
    var found = false;
    for (var i = 0; i < album.likes.length; i++) {
      if (album.likes[i].user == req.user.id) {
        found = true;
        removeIndex = i;
        break;
      }
    }
    console.log("found", found);

    if (found) {
      //remove the user from likes array
      //Get remove Index
      console.log("index", removeIndex);
      //Splice out
      album.likes.splice(removeIndex, 1);
      album.save().then(album1 => res.json(album1));
    } else {
      //Add the user id to likes array
      album.likes.unshift({ user: req.user.id });
      album.save().then(album => res.json(album));
    }
    console.log("likes array", album.likes);
  }
);
//Route to unlike the albums
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const album = await Album.findById(req.params.id);
    console.log("unlike user", req.user.id);
    //checking if user has already liked the post
    if (
      album.likes.filter(like => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res
        .status(400)
        .json({ notLiked: "user has not liked this album" });
    } else {
      //remove the user from likes array
      //Get reomve Indes
      const removeIndex = album.likes
        .map(item => item.user.toString())
        .indexOf(req.user);

      //Splice out
      album.likes.splice(removeIndex, 1);
      album.save().then(album1 => res.json(album1));
    }
  }
);

//Route to add comments to a post
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const album = await Album.findById(req.params.id);
    const newComment = {
      text: req.body.text,
      user: req.body.user,
      user: req.user.id
    };
    album.comments.unshift(newComment);
    album.save().then(newAlbum => res.json(newAlbum));
  }
);

//Route to delete a comment
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const album = await Album.findById(req.params.id);
    if (
      album.comments.filter(
        comment => comment._id.toString() === req.params.comment_id
      ).length === 0
    ) {
      return res.status(404).json({ notfound: "comments not found" });
    } else {
      //remove the user from likes array
      //Get reomve Indes
      const removeIndex = album.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);

      //Splice out
      album.comments.splice(removeIndex, 1);
      album.save().then(album => res.json(album));
    }
  }
);

module.exports = router;
