const { basedir } = global;

const { Transaction } = require(`${basedir}/models/transaction`);

const { User } = require(`${basedir}/models/user`);

const { createError } = require(`${basedir}/helpers`);

const createTransaction = async (req, res) => {
  console.log(req.body);
  const newTransaction = { ...req.body, owner: req.user._id };
  const result = await Transaction.create(newTransaction);
  const userBalance = req.body.balance;
  const resultBalance = await User.findOneAndUpdate(
    { _id: req.user._id },
    { balance: userBalance },
    { returnDocument: "after" }
  );
  if (!resultBalance) {
    throw createError(404);
  }
  const { balance } = resultBalance;
  res.status(201).json({
    status: "Created",
    result,
    balance,
  });
};

module.exports = createTransaction;

// owner: req.user._id;
