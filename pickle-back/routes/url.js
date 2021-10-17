const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.json({ url: "www.google.com" });
});

module.exports = router;
