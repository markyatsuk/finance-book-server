const { basedir } = global;

const { Transaction } = require(`${basedir}/models/transaction`);

const { createError } = require(`${basedir}/helpers`);

const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  const result = await Transaction.findByIdAndRemove({ _id: id });
  if (!result) {
    throw createError(404);
  }
  res.json({
    message: "Your transaction was deleted!",
  });
};

module.exports = deleteTransaction;
