const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const User = new Schema({
  name: { type: String, required: true },
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  adminStatus: { type: Boolean, required: true, default: false },
  friendsList: [],
  socialMap: {      
        mapName: { type: String, default: "Social Map" },
        startlat: { type: Number, default: 42 },
        startlng: { type: Number, default: -83 },
        address: { type: String, default: "" },
        pins: [
          {
            lat: { type: Number },
            lng: { type: Number },
            arEnabled: { type: Boolean, default: false },
            w3wAddress: { type: String, default: null},
            secretMessage: { type: String, default: ""},
            fromName: {type: String, default: "" },
            //Default pin image can be changed here
            //Must also be changed in SelectIconScreen.js
            icon: { type: String, default: "apingreen.png" },
            label: { type: String },
            date: { type: String },
            comments: { type: String },
          },
        ],
        routes: [
          {
            label: { type: String },
            date: { type: String },
            color: { type: String, default: "#000000" },
            coordsArr: [
              {
                latitude: { type: Number },
                longitude: { type: Number },
              },
            ],
          },
        ],
      },
  tempObjects: 
    {
      passwordResetCode: { type: String, default: "" },
      friendRequests: [],
      tempMaps: [
      {
        mapName: { type: String },
        fromName: {type: String },
        startlat: { type: Number },
        exported: { type: Boolean},
        startlng: { type: Number },
        address: { type: String },
        pins: [
          {
            lat: { type: Number },
            lng: { type: Number },
            arEnabled: { type: Boolean, default: false },
            w3wAddress: { type: String, default: null},
            secretMessage: { type: String, default: ""},
            fromName: {type: String, default: "" },
            //Default pin image can be changed here
            //Must also be changed in SelectIconScreen.js
            icon: { type: String, default: "apingreen.png" },
            label: { type: String },
            date: { type: String },
            comments: { type: String },
          },
        ],
        routes: [
          {
            label: { type: String },
            date: { type: String },
            color: { type: String, default: "#000000" },
            coordsArr: [
              {
                latitude: { type: Number },
                longitude: { type: Number },
              },
            ],
          },
        ],
      },
    ],
      tempPins:  [
          {
            lat: { type: Number },
            lng: { type: Number },
            arEnabled: { type: Boolean, default: false },
            w3wAddress: { type: String, default: null},
            secretMessage: { type: String, default: ""},
            fromName: {type: String, default: "" },
            //Default pin image can be changed here
            //Must also be changed in SelectIconScreen.js
            icon: { type: String, default: "apingreen.png" },
            label: { type: String },
            date: { type: String },
            comments: { type: String },
          }
        ]
    },
  maps: [
    {
      mapName: { type: String },
      fromName: {type: String, default: "" },
      startlat: { type: Number },
      exported: { type: Boolean, default: false },
      startlng: { type: Number },
      address: { type: String },
      pins: [
        {
          lat: { type: Number },
          lng: { type: Number },
          arEnabled: { type: Boolean, default: false },
          w3wAddress: { type: String, default: null},
          secretMessage: { type: String, default: ""},
          fromName: {type: String, default: "" },
          //Default pin image can be changed here
          //Must also be changed in SelectIconScreen.js
          icon: { type: String, default: "apingreen.png" },
          label: { type: String },
          date: { type: String },
          comments: { type: String },
        },
      ],
      routes: [
        {
          label: { type: String },
          date: { type: String },
          color: { type: String, default: "#000000" },
          coordsArr: [
            {
              latitude: { type: Number },
              longitude: { type: Number },
            },
          ],
        },
      ],
    },
  ],
});

/*schemaUser = mongoose.model('user', User);
schemaRoute = mongoose.model('route', Route);
schemaPin = mongoose.model('pin', Pin);
schemaMap = mongoose.model('map', Map);*/
User.pre("save", function (next) {
  let user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

User.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
module.exports = mongoose.model("user", User);
//module.exports = mongoose.model('route', Route);
//module.exports = mongoose.model('pin', Pin);
//module.exports = mongoose.model('map', Map);
