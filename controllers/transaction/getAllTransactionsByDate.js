const { basedir } = global;

const { Transaction } = require(`${basedir}/models/transaction`);

const getAllTransactionsByDate = async (req, res) => {
  const { date } = req.params;

  const [day, month, year] = date.split(".");

  const result = await Transaction.find({
    owner: req.user._id,
    date: {
      day,
      month,
      year,
    },
  });

  res.json({
    status: "Ok",
    result,
  });
};

module.exports = getAllTransactionsByDate;
