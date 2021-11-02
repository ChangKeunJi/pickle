const express = require("express");
const router = express.Router();
const passport = require("passport");
const mode = process.env.NODE_ENV;
const { User } = require("../models");
const passportFunc = require("../passport/index");

const frontUrl = "http://3.38.99.75";

// 유저 정보 불러오기
router.get("/", async (req, res) => {
  // console.log(req.headers, "😊😊😊😊😊😊😊");
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

// router.get(
//   "/kakao/callback",
//   passport.authenticate("kakao", {
//     failureRedirect: "/login",
//   }),
//   (req, res) => {
//     if (mode === "development") {
//       // 개발환경
//       const sessionId = req.sessionID;
//       res.redirect(`http://localhost:3000/api/login?sid=${sessionId}`);
//     } else {
//       // 배포환경
//       req.login(req.user, (req, res) => {
//         console.log(req.user);
//         console.log(req.session);
//         res.redirect(`http://3.38.99.75/`);
//       });
//       // const sessionId = req.sessionID;
//       // res.redirect(`http://3.38.99.75/api/login?sid=${sessionId}`);
//     }
//   }
// );

router.get("/kakao/callback", function (req, res, next) {
  passport.authenticate("kakao", function (err, user, info) {
    if (err) {
      console.log("ERROR😊😊");
      return next(err);
    }
    if (!user) {
      console.log("NO USER😊😊");
      return res.redirect(`http://3.38.99.75/login`);
    }
    req.logIn(user, function (err) {
      console.log("LOGIN😊😊");
      if (err) {
        return next(err);
      }
      return res.redirect(`http://3.38.99.75/`);
    });
  })(req, res, next);
});

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
