// backend/user/index.js
const express = require("express");
const userRouter = require("./user");
const accountRouter = require("./account");

const router = express.Router();

router.options("/*", (_, res) => {
  res.sendStatus(200);
});

router.use("/user", userRouter);
router.use("/account", accountRouter);

module.exports = router;
