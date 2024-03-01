const express = require("express");
const zod = require("zod");
const authMiddleware = require("../middleware");
const { Account, User } = require("../db");
const { default: mongoose } = require("mongoose");
const router = express.Router();

const transactionValidation = zod.object({
  payee: zod.string(),
  amount: zod.number(),
});

router.get("/balance", authMiddleware, async function (req, res) {
  const userId = req.userId;

  const account = await Account.findOne({ userId: userId });

  if (!account) {
    res.status(411).json({ msg: "Account not found!" });
  }

  res.status(200).json({ balance: account.balance });
});

router.post("/transfer", authMiddleware, async function (req, res) {
  const payeeId = req.body.to;
  const amount = parseInt(req.body.amount);

  const isValidTransaction = transactionValidation.safeParse({
    payeeId,
    amount,
  });
  if (!isValidTransaction) {
    res.status(400).json({ msg: "Invalid Details!" });
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const userAccount = await Account.findOne({ userId: req.userId }).session(
      session
    );
    if (userAccount.balance < amount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(403).json({ msg: "Insufficient balance!" });
    }
    const payeeAccount = await Account.findOne({ userId: payeeId }).session(
      session
    );

    if (!payeeAccount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ msg: "Payee account not found!" });
    }
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);

    await Account.updateOne(
      { userId: payeeId },
      { $inc: { balance: +amount } }
    ).session(session);

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ msg: "Transfer successful!" });
  } catch {
    await session.abortTransaction();
    res.status(500).json({ msg: "Transaction failed!" });
  } finally {
    session.endSession();
  }
});

module.exports = router;
