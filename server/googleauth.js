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
      callbackURL: "http://localhost:7000/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //     return cb(err, user);
      //   });
      //   const user = await UserModel.findOne({ email: profile._json.email });

      //   console.log(user);
      //   if (user) {
      //     jwt.sign(
      //       { _id: user._id, email: user.email },
      //       "shh",
      //       function (err, token) {
      //         if (err) {
      //           return res.status(400).send("try again");
      //         }
      //         console.log(token);
      //         //  return res.send({ token });
      //         return cb(null, profile._json);
      //       }
      //     );
      //     // console.log(token);
      //     //  console.log(profile._json);
      //   } else {
      //     const newUser = UserModel.create({
      //       email: profile._json,
      //       pswd: Math.random * 1000,
      //     });
      //     console.log(newUser);
      return cb(null, profile._json);
    }
  )
);
module.exports = passport;