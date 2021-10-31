const express = require("express");
const router = express.Router();
const passport = require("passport");

const { User } = require("../models");
const frontUrl = "http://3.38.99.75";

// 유저 정보 불러오기
router.get("/", async (req, res) => {
  if (req.user) {
    const user = await User.findOne({
      where: { id: req.user.dataValues.id },
    });
    res.send(user);
  } else {
    res.send("null");
  }
});

// 카카오 로그인
router.get("/kakao", passport.authenticate("kakao"));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    console.log(req.session);
    console.log(req.cookies);
    console.log(req.signedCookies);
    res.redirect("http://3.38.99.75/api/login");
  }
);

// 구글 로그인

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect(frontUrl);
  }
);

// 로그아웃

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  req.session = null;
  res.send("OK");
});

module.exports = router;
