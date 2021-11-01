const express = require("express");
const router = express.Router();
const passport = require("passport");
const mode = process.env.NODE_ENV;
const { User, Session } = require("../models");

const frontUrl = "http://3.38.99.75";

// 유저 정보 불러오기
router.get("/", async (req, res) => {
  const id = req.cookies["passportId"];
  if (!id) {
    return res.send(null);
  }
  const user = await User.findOne({
    where: { id: id },
  });
  if (user) {
    const user = await User.findOne({
      where: { id: req.user.dataValues.id },
    });
    res.send(user);
  } else {
    res.send("null");
  }

  // if (req.user) {
  //   const user = await User.findOne({
  //     where: { id: req.user.dataValues.id },
  //   });
  //   res.send(user);
  // } else {
  //   res.send("null");
  // }
});

// 카카오 로그인
router.get("/kakao", passport.authenticate("kakao"));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    if (mode === "development") {
      const passportId = req.session.passport["user"];
      res.cookie("passportId", passportId);
      res.redirect("http://localhost:3000/api/login");
      // res.redirect("http://localhost:3000");
    } else {
      const passportId = req.session.passport["user"];
      res.cookie("passportId", passportId);
      res.redirect(`${frontUrl}/api/login`);
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
