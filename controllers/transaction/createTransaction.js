const { basedir } = global;

const { Transaction } = require(`${basedir}/models/transaction`);

const { User } = require(`${basedir}/models/user`);

const { createError } = require(`${basedir}/helpers`);

const createTransaction = async (req, res) => {
  const { _id } = req.user;
  const { type, sum } = req.body;

  const newTransaction = { ...req.body, owner: _id };
  const result = await Transaction.create(newTransaction);

  if (!result) {
    throw createError(404);
  }

  const { balance } = await User.findById(_id);

  const newBalance = type === "income" ? balance + sum : balance - sum;

  const rounBalance = Math.round(newBalance * 100) / 100;

  await User.findByIdAndUpdate(_id, { balance: rounBalance }, { new: true });

  res.status(201).json({
    status: "Created",
    result,
    balance: rounBalance,
  });
};

module.exports = createTransaction;
