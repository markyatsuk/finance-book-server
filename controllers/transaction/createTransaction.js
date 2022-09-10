const { basedir } = global;

const { Transaction } = require(`${basedir}/models/transaction`);

const { User } = require(`${basedir}/models/user`);

const createTransaction = async (req, res) => {
  const { type, sum } = req.body;
  const { _id } = req.user;

  const newTransaction = { ...req.body, owner: _id };
  const result = await Transaction.create(newTransaction);

  const { balance } = await User.findById(_id);

  const newBalance = type === "income" ? balance + sum : balance - sum;

  if (newBalance < 0) return null;

  await User.findByIdAndUpdate(_id, { balance: newBalance }, { new: true });

  res.status(201).json({
    status: "Created",
    result,
    balance: newBalance,
  });
};

module.exports = createTransaction;
