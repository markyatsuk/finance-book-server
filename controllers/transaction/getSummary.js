const { basedir } = global;

const { Transaction } = require(`${basedir}/models/transaction`);

const { createError } = require(`${basedir}/helpers`);

const getSummary = async (req, res) => {
  const { _id: userId } = req.user;
  const { type } = req.params;

  const transactions = await Transaction.aggregate([
    {
      $match: {
        owner: userId,
        type: type,
      },
    },
    {
      $group: {
        _id: {
          month: "$month",
          year: "$year",
          type: "$type",
        },
        total: { $sum: "$sum" },
      },
    },
    {
      $project: {
        _id: 1,
        type: 1,
        total: 1,
      },
    },
    {
      $sort: {
        month: 1,
      },
    },
  ]);

  if (!transactions) {
    throw createError(404);
  }

  res.json({
    status: "success",
    code: 200,
    transactions,
  });
};

module.exports = getSummary;
