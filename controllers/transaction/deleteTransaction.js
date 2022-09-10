const { basedir } = global;

const { Transaction } = require(`${basedir}/models/transaction`);
const { User } = require(`${basedir}/models/user`);

const { createError } = require(`${basedir}/helpers`);

const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  const { sum, type } = await Transaction.findById({ _id: id });
  const { balance } = await User.findById(_id);

  const newBalance = type === "income" ? balance - sum : balance + sum;

  await User.findByIdAndUpdate(_id, { balance: newBalance }, { new: true });

  const result = await Transaction.findByIdAndRemove({ _id: id });
  if (!result) {
    throw createError(404);
  }
  res.json({
    message: "Your transaction was deleted!",
  });
};

module.exports = deleteTransaction;
