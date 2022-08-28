const { basedir } = global;

const { Transaction } = require(`${basedir}/models/transaction`);

const { User } = require(`${basedir}/models/user`);

const { createError } = require(`${basedir}/helpers`);

const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const result = await Transaction.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  console.log(result);
  if (!result) {
    throw createError(404);
  }
  const userId = req.user._id;
  const userBalance = req.body.balance;
  const resultBalance = await User.findOneAndUpdate(
    { _id: userId },
    { balance: userBalance }
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

module.exports = updateTransaction;
