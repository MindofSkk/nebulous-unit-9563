const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const UserModel = require("./models/UserModel");
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
      console.log("emailGoodle", profile._json.email);
      const user = await UserModel.findOne({ email: profile._json.email });

      console.log("mongoUser", user);
      if (user) {
        jwt.sign(
          { _id: user._id, email: user.email },
          "shh",
          function (err, token) {
            if (err) {
              return res.status(400).send("try again");
            }
            console.log(token);
            //  return res.send({ token });
            return cb(null, { img: profile._json.picture, token });
          }
        );
        // console.log(token);
        //  console.log(profile._json);
      } else {
        const newUser = await UserModel.create({
          email: profile._json.email,
          pswd: Math.random() * 1000 + "xyz",
        });

        // console.log(newUser);
        jwt.sign(
          { _id: newUser._id, email: newUser.email },
          "shh",
          function (err, token) {
            if (err) {
              return res.status(400).send("try again");
            }
            //    console.log(token);
            //  return res.send({ token });
            return cb(null, { img: profile._json.picture, token });
          }
        );
        // return cb(null, profile._json);
      }
    }
  )
);
module.exports = passport;
