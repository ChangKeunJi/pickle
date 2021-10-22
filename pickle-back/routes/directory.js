const express = require("express");
const router = express.Router();

const { Directory } = require("../models");
const { isLoggedIn } = require("./middleware");

// 모든 카테고리 불러오기
router.get("/", isLoggedIn, async (req, res, next) => {
  try {
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
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 카테고리 추가하기
router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const allDir = await Directory.findAll({
      where: { UserId: req.user.dataValues.id },
    });

    let order;
    if (allDir.length === 0) {
      order = 1;
    } else {
      let max = 0;
      for (let el of allDir) {
        if (el.order > max) {
          max = el.order;
        }
      }
      order = max + 1;
    }

    const newDir = await Directory.create({
      name: req.body.name,
      UserId: req.user.dataValues.id,
      order: order,
    });

    res.send(newDir);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 카테고리 순서 변경
router.patch("/order", isLoggedIn, async (req, res, next) => {
  try {
    await Directory.update(
      {
        order: req.body.order,
      },
      {
        where: { id: req.body.id },
      }
    );

    const dirs = await Directory.findAll({
      where: { UserId: req.user.dataValues.id },
      order: [["order", "DESC"]],
    });

    res.send(dirs);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 카테고리 이름 변경
router.patch("/", isLoggedIn, async (req, res, next) => {
  try {
    const updatedId = await Directory.update(
      {
        name: req.body.name,
      },
      {
        where: { id: req.body.id },
      }
    );

    const updatedDir = await Directory.findOne({ where: { id: req.body.id } });
    res.send(updatedDir);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 카테고리 삭제

router.delete("/:dirId", isLoggedIn, async (req, res, next) => {
  try {
    const id = req.params.dirId;

    await Directory.destroy({
      where: { id },
    });

    res.send(id);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

// https://wooooooak.github.io/web/2018/11/10/req.params-vs-req.query/
