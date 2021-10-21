const express = require("express");
const router = express.Router();
const passport = require("passport");

const { isLoggedIn, isNotLoggedIn } = require("./middleware");
const { User, Directory } = require("../models");

// ===== 유저 정보를 불러온다. =====
router.get("/", async (req, res) => {
  if (req.user) {
    const user = await User.findOne({
      where: { id: req.user.dataValues.id },
      include: [
        {
          model: Directory,
          attributes: ["id"],
        },
      ],
    });

    res.send(user);
  } else {
    res.send("null");
  }
});

// ===== 카카오 로그인 =====
router.get("/kakao", passport.authenticate("kakao"));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.redirect("http://localhost:3000");
  }
);

// ===== 구글 로그인 =====

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("http://localhost:3000");
  }
);

// ===== 로그아웃 =====

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
