const { basedir } = global;

const { Transaction } = require(`${basedir}/models/transaction`);

const { User } = require(`${basedir}/models/user`);

const { createError } = require(`${basedir}/helpers`);

const createTransaction = async (req, res) => {
  const { _id } = req.user;

  const newTransaction = { ...req.body, owner: _id };
  const result = await Transaction.create(newTransaction);

  if (!result) {
    throw createError(404);
  }

  const { balance } = await User.findById(_id);

  res.status(201).json({
    status: "Created",
    result,
    balance,
  });
};

module.exports = createTransaction;
