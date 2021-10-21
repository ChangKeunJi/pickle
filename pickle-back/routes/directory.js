const express = require("express");
const router = express.Router();

const { User, Comment } = require("../models");
const { Directory } = require("../models");
const { isLoggedIn } = require("./middleware");

// 모든 카테고리 불러오기
router.get("/", isLoggedIn, async (req, res) => {
  const id = req.user.dataValues.id;
  const dirs = await Directory.findAll({
    where: { UserId: id },
    attributes: {
      include: ["id"], //
    },
    order: [
      ["order", "DESC"],
      // 카테고리 order 내림차순으로 정렬
    ],
  });

  if (!dirs) {
    res.end();
  } else {
    res.send(dirs);
  }
});

// 카테고리 추가하기
router.post("/", async (req, res) => {
  const newDir = await Directory.create({
    name: req.body.name,
    UserId: req.user.dataValues.id,
  });

  res.send(newDir);
});

module.exports = router;
