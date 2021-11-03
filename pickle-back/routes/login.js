const express = require("express");
const router = express.Router();
const passport = require("passport");
const mode = process.env.NODE_ENV;
const { User } = require("../models");

router.get("/", async (req, res) => {
  // console.log(req.headers, "🍎");
  // console.log(req.session, "🍎");
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
  async (req, res) => {
    if (mode === "development") {
      // 개발환경
      res.redirect("http://localhost:3000");
    } else {
      // 배포환경
      // res.redirect(
      //   `http://${frontUrl}/api/login?sid=${sessionId}&pid=${passportId}`
      // );
      // console.log(req.headers, "🍎");
      // console.log(req.session, "🍎");
      res.redirect("http://3.36.254.124");
    }
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
    res.redirect("http://3.36.254.124");
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
