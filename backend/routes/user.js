// backend/routes/index.js
const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const userRouter = require("./user");
const { User, Account } = require("../db");
const authMiddleware = require("../middleware").default;

const router = express.Router();

const signupValidation = zod.object({
  username: zod.string().email(),
  firstname: zod.string(),
  lastname: zod.string(),
  password: zod.string().min(6, "Password needs to be atleast 6 characters!"),
});
const signinValidation = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});
const updateValidation = zod.object({
  firstname: zod.string().optional(),
  lastname: zod.string().optional(),
  password: zod.string().optional(),
});

router.post("/signup", async function (req, res) {
  const username = req.body.username;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const password = req.body.password;

  const isValidUserDetails = signupValidation.safeParse({
    username,
    firstname,
    lastname,
    password,
  });

  if (!isValidUserDetails) {
    return res
      .status(411)
      .json({ msg: "Email already taken / Incorrect inputs" });
  }

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res
      .status(411)
      .json({ msg: "Email already taken / Incorrect inputs" });
  }

  const user = await User.create({
    username,
    firstname,
    lastname,
    password,
  });

  const userId = user._id;

  await Account.create({
    userId: userId,
    balance: Math.floor(Math.random() * 10000 + 1),
  });
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);

  return res
    .status(200)
    .json({ msg: "User created successfully", token: token });
});

router.post("/signin", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const isValidCredentials = signinValidation.safeParse({ username, password });

  if (!isValidCredentials) {
    return res.status(411).json({ msg: "Unprocessable Entity" });
  }

  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    return res
      .status(200)
      .json({ msg: "Logged in successfully", token: token });
  }

  return res.status(411).json({ msg: "Error while logging in" });
});

router.put("/", authMiddleware, async function (req, res) {
  const { firstname, lastname, password } = req.body;

  const isValidUpdate = updateValidation.safeParse(req.body);

  if (!isValidUpdate) {
    res.status(411).json({ msg: "Error while updating information" });
  }

  const user = await User.findById(req.userId);
  console.log(user);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (firstname) {
    user.firstname = firstname;
  }
  if (password) {
    user.password = password;
  }
  if (lastname) {
    user.lastname = lastname;
  }

  try {
    await user.save();
    res.status(200).json({ message: "User details updated successfully" });
  } catch {
    res.status(411).json({ message: "Error while updating information" });
  }
});

router.get("/bulk", authMiddleware, async function (req, res) {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      { firstname: { $regex: new RegExp(filter, "i") } },
      { lastname: { $regex: new RegExp(filter, "i") } },
    ],
  });
  res.status(200).json({
    user: users.map((user) => ({
      username: user?.username,
      firstname: user.firstname,
      lastname: user.lastname,
      _id: user._id,
    })),
    userId: req.userId,
  });
});

module.exports = router;
