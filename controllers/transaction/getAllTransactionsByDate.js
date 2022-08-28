const { basedir } = global;

const { Transaction } = require(`${basedir}/models/transaction`);

const getAllTransactionsByDate = async (req, res) => {
  const { date } = req.params;
  const result = await Transaction.find({
    owner: req.user._id,
    date,
  });

  res.json({
    status: "Ok",
    result,
  });
};

module.exports = getAllTransactionsByDate;
