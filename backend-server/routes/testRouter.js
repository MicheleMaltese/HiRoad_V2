const what3words = require("@what3words/api");
what3words.setOptions({key: 'AWKG1YJG'});

const express = require("express");
const UserModel = require("../models/testModel");
const db = require("../db");
const bson = require('bson')

const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const router = express.Router();

//initializes the bucket
let bucket;
//setting up the bucket, upon connection
mongoose.connection.on("connected", () => {
  var client = mongoose.connections[0].client;
  bucket = new mongoose.mongo.GridFSBucket(db.db, {
    bucketName: "pinIcons",
  });
});
//setting up the storage for the bucket
const storage = new GridFsStorage({
  url: "mongodb+srv://hiroad:mittmaps@hiroad.gwedg.mongodb.net/hiroad",
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: "pinIcons",
      };
      resolve(fileInfo);
    });
  },
});
//setting up the upload with the storage
const upload = multer({ storage });

//Allows user to upload a file, takes up to 10 files
router.post("/upload", upload.array("file", 10), (req, res) => {
  res.status(200).send("File uploaded successfully");
});

//Allows user to delete a specific file (chosen by file name). Can only delete one at a time
router.post("/fileinfo/delete/:filename", (req, res) => {
  bucket.find({ filename: req.params.filename }).toArray((err, files) => {
    if (err) {
      return res.status(400).send(err);
    }
    bucket.delete(files[0]._id);
    res.status(200).send(files[0].filename + " deleted");
  });
});

//Displays one image. Works like a direct URL to the image, can be used as a source
router.get("/fileinfo/:filename", (req, res) => {
  const file = bucket
    .find({ filename: req.params.filename })
    .toArray((err, files) => {
      if (err) {
        return res.status(400).send(err);
      }
      // Return default pin if file doesn't exist
      if (files.length === 0) {
        bucket.openDownloadStreamByName("apingreen.png").pipe(res);
      } else {
        bucket.openDownloadStreamByName(req.params.filename).pipe(res);
      }
    });
});

//Returns an array of every file name in the database
router.get("/fileinfo", (req, res) => {
  const imgarr = [];
  const cursor = bucket.find().toArray((err, files) => {
    if (err) {
      return res.status(400).send(err);
    }
    if (files.length === 0) {
      return res.status(404).send("No Files Found");
    }
    files.forEach((doc) => {
      imgarr.push(doc.filename);
    });
    res.status(200).send(imgarr);
  });
});

//Creates a new user
//FIXME: This isn't being encrypted yet is it?
router.post("/user", (req, res) => {
  //UserCtrl.createUser;
  console.log("User creation being attempted");
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide full user info",
    });
  }

  const user = new UserModel(body);
  console.log(user);
  // user.maps[0] = firstMap;
  if (!user) {
    console.log("No user");
    return res.status(400).json({ success: false, error: err });
  }

  user
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: user._id,
        message: "User created!",
      });
    })
    .catch((error) => {
      console.log("Oops");
      return res.status(400).json({
        error,
        message: "User not created",
      });
    });
});

router.post("/addfriend", (req, res) => {
  console.log("Friend request attempted");
  const body = req.body;
  const user_phone = body.user_phone;
  const user_name = body.user_name;
  const friend_phone = body.friend_phone;

    if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  console.log(user_phone);

  UserModel.findOne({ phone: friend_phone }, (err, user) => {
    if (err || user == null) {
      return res.status(404).json({
        err,
        message: "User not found!",
      });
    }
    console.log(user);

    let friend_request =  {
      name: user_name,
      phone: user_phone
    };

    let requests = user.tempObjects.friendRequests;
    let fr = user.friendsList;

    console.log(requests);
    console.log(fr);
    console.log(friend_request);

    const requestExists = requests.filter(function (el) {
      return el.name == friend_request.name &&
        el.phone == friend_request.phone
      });

    const friendExists = fr.filter(function (el) {
      return el.name == friend_request.name &&
        el.phone == friend_request.phone
      });

    if (requestExists.length != 0 || friendExists.length != 0 || friend_phone == user_phone) {
      console.log("Friend already requested/added")
    }
    else {
      requests.push(friend_request);
    }

    user.tempObjects.friendRequests = requests;

    user
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: user._id,
          message: "Friend request sent!",
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(404).json({
          error,
          message: "Friend request not sent",
        });
      });
  });
});

router.post("/exportmap", (req, res) => {
  console.log("Map request attempted");
  const body = req.body;
  const friend_phone = body.friend_phone;
  let user_map = body.map;
  const user_name = body.user_name;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  console.log(friend_phone);

  UserModel.findOne({ phone: friend_phone }, (err, user) => {
    if (err || user == null) {
      return res.status(404).json({
        err,
        message: "User not found!",
      });
    }

    console.log(user_map);

    user_map.exported = true;
    user_map.fromName = user_name;

    let requests = user.tempObjects.tempMaps;
    requests.push(user_map);

    user.tempObjects.tempMaps = requests;
    console.log(user_map);

    user
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: user._id,
          message: "Friend request sent!",
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(404).json({
          error,
          message: "Friend request not sent",
        });
      });
  });
});

router.post("/exportpin", (req, res) => {
  console.log("Pin request attempted");
  const body = req.body;
  const friend_phone = body.friend_phone;
  let user_pin = body.pin;
  const user_name = body.user_name;
  const secret_message = body.secret_message;

    if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  console.log(friend_phone);
  console.log(user_pin);

  UserModel.findOne({ phone: friend_phone }, (err, user) => {
    if (err || user == null) {
      return res.status(404).json({
        err,
        message: "User not found!",
      });
    }

    //console.log(user);

    user_pin.arEnabled = true;
    user_pin.fromName = user_name;
    user_pin.secretMessage = secret_message;

    let requests = user.tempObjects.tempPins;
    requests.push(user_pin);

    user.tempObjects.tempPins = requests;
    console.log(user_pin);

    user
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: user._id,
          message: "Friend request sent!",
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(404).json({
          error,
          message: "Friend request not sent",
        });
      });
  });
});

router.post("/friendaccepted", (req, res) => {
  console.log("Friend acceptance attempted");
  const body = req.body;
  const user_phone = body.user_phone;
  const name = body.name;
  const phone = body.phone;

    if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  console.log(user_phone);
  console.log(name);
  console.log(phone);

  let acceptedRequest = {
    "name": name,
    "phone": phone,
  };

  console.log(acceptedRequest);

  UserModel.findOne({ phone: user_phone }, (err, user) => {
    if (err || user == null) {
      return res.status(404).json({
        err,
        message: "User not found!",
      });
    }

    let fr = user.friendsList;

    const friendExists = fr.filter(function (el) {
      return el.name == acceptedRequest.name &&
        el.phone == acceptedRequest.phone
      });

    if (friendExists.length != 0) {
      console.log("Friend already accepted")
    }
    else {
      let fr = user.friendsList;
      fr.push(acceptedRequest);

      user.socialMap.friendsList = fr;
    }

    console.log(user.friendsList);

    user
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: user._id,
          message: "Friend requesting complete!",
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(404).json({
          error,
          message: "Pin transfer failed",
        });
      });
  });
})

router.post("/acceptpin", async(req, res) => {
  console.log("Pin transfer attempted");
  const body = req.body;
  const user_email = body.email
  let user_pin = body.pin;

    if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  console.log(user_email);
  console.log(user_pin);

  res.setHeader("Content-Type", "application/json");

  try {
    const data = await what3words.convertTo3wa({lat: parseFloat(user_pin.lat), lng: parseFloat(user_pin.lng)});

    console.log(data.words);
    user_pin.w3wAddress = data.words;
  }
  catch(error) {
    res.status(400).send({error: JSON.stringify(error)});
  }

  UserModel.findOne({ email: user_email }, (err, user) => {
    if (err || user == null) {
      return res.status(404).json({
        err,
        message: "User not found!",
      });
    }

    let pins = user.socialMap.pins;
    pins.push(user_pin);

    user.socialMap.pins = pins;
    console.log(user);

    user
      .save()
      .then(() => {
        return res.status(200).send(user_pin);
      })
      .catch((error) => {
        console.log(error);
        return res.status(404).json({
          error,
          message: "Pin transfer failed",
        });
      });
  });
});

router.post("/resetpassword", (req, res) => {
  console.log("Password reset being attempted");
  const body = req.body;
  const user_email = body.email;
  const user_password = body.password;
  console.log(body.email);
  console.log(body.password);

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  UserModel.findOne({ email: user_email }, (err, user) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "User not found!",
      });
    }

    user.password = user_password;
    console.log(user);

    user
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: user._id,
          message: "User updated!",
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(404).json({
          error,
          message: "User not updated",
        });
      });
  });
});

router.post("/userupdate/:id", (req, res) => {
  console.log("User update being attempted");
  const body = req.body;
  const currUser = body.currUser;
  //console.log(body);
  // console.log(body.email);
  // console.log(body.currUser);
  //   console.log("Body set");
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  UserModel.findOne({ email: currUser.email }, (err, user) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "User not found!",
      });
    }

    user.name = currUser.name;
    user.fullName = currUser.fullName;
    user.email = currUser.email;
    user.phone = currUser.phone;
    user.friendsList = currUser.friendsList;
    user.tempObjects = currUser.tempObjects;
    user.password = currUser.password;
    user.maps = currUser.maps;
    user.socialMap = currUser.socialMap;

    console.log(currUser.friendsList);
    console.log(user.friendsList);
    console.log(user);

    user
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: user._id,
          message: "User updated!",
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(404).json({
          error,
          message: "User not updated",
        });
      });
  });
});

router.get("/user/:email/:password", (req, res) => {
  UserModel.findOne({ email: req.params.email }, (err, user) => {
    if (err) {
      console.log("first err");
      return res.status(400).send("First err");
    }
    if (!user) {
      return res.status(404).json({ success: false, error: `User not found` });
    }
    // test a matching password
    user.comparePassword(req.params.password, function (err, isMatch) {

      if (err) {
        console.log("second err");
        return res.status(400).send("Second err");
      }
      //console.log();
      if (isMatch) {
        return res.status(200).send(user);
      } else {
        console.log("not match");
        return res.status(400).send("Not Match");
      }
    });
  });
});

router.get("/user/:email", (req, res) => {
  UserModel.findOne({ email: req.params.email }, (err, user) => {
    console.log(user)
    if (err) {
      console.log("first err");
      return res.status(400).send("First err");
    }
    if (user == null) {
      return res.status(404).json({ success: false, error: `User not found` });
    }

    return res.status(200).send(user);
  });
});

module.exports = router;
