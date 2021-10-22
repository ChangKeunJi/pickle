const express = require("express");
const router = express.Router();
const urlMetadata = require("url-metadata");

const { Post, Directory } = require("../models");
const { isLoggedIn } = require("./middleware");

// ===== 포스트 불러오기
router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const allPosts = await Post.findAll({
      where: { UserId: req.user.dataValues.id },
      order: [
        ["createdAt", "DESC"], // 게시글 정렬
      ],
    });

    res.send(allPosts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// ===== 포스트 추가
router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const data = await urlMetadata(req.body.url);
    console.log(data);
    if (data) {
      const newPost = await Post.create({
        url: data.url || data["og:url"],
        thumbnail: data.image || data["og:image"],
        title: data.title || data["og:title"],
        desc: data.description || data["og:description"],
        favicon:
          data["msapplication-TileImage"] || data.image || data["og:image"],
        author: data.author || data["og:site_name"] || data.source,
        favorite: false,
        UserId: req.user.dataValues.id,
      });
      res.send(newPost);
    } else {
      res.status(403).send("올바른 URL이 아닙니다.");
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// ===== 포스트 삭제

router.delete("/:postId", async (req, res, next) => {
  try {
    const id = req.params.postId;

    await Post.destroy({
      where: { id },
    });

    res.send(id);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
