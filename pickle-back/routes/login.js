const express = require("express");
const router = express.Router();
const passport = require("passport");

const { User } = require("../models");

router.get("/", (req, res) => {
  console.log("!!!", req.user, "!!!");
  if (req.user) {
    res.send(req.user.dataValues);
  } else {
    res.send("null");
  }
});

router.get("/kakao", passport.authenticate("kakao"));
// router.get("/naver", passport.authenticate("naver"));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    // console.log("$$$", req.user.dataValues, "$$$");
    res.redirect("http://localhost:3000");
  }
);

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  req.session = null;
  res.send("OK");
});

module.exports = router;

// session 으로 data 전달 하면서 동시에 redirect
// https://burning-camp.tistory.com/22
// router.get("/success", (req, res) => {
//   const passedVariable = req.session.valid;
//   req.session.valid = null;
//   res.send(passedVariable);
// });
