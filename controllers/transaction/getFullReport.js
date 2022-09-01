const { basedir } = global;

const { Transaction } = require(`${basedir}/models/transaction`);

const { createError } = require(`${basedir}/helpers`);

const getFullReport = async (req, res) => {
  const { _id: userId } = req.user;
  const { month, year } = req.query;

  const transactions = await Transaction.aggregate([
    {
      $match: {
        owner: userId,
        "date.month": month,
        "date.year": year,
      },
    },
    {
      $group: {
        _id: {
          type: "$type",
          category: "$category",
          subCategory: "$subCategory",
          sum: "$sum",
        },
      },
    },
    {
      $group: {
        _id: "$_id.category",
        data: {
          $push: {
            type: "$_id.type",
            subCategory: "$_id.subCategory",
            sum: "$_id.sum",
          },
        },
        summary: { $sum: "$_id.sum" },
      },
    },
    {
      $group: {
        _id: { $first: "$data.type" },
        reports: {
          $push: "$$ROOT",
        },
        total: { $sum: "$summary" },
      },
    },
    {
      $project: {
        _id: {
          type: "$_id",
        },
        reports: 1,
        total: 1,
      },
    },
  ]);

  if (!transactions) {
    throw createError;
  }

  res.json({
    status: "success",
    code: 200,
    transactions,
  });
};

module.exports = getFullReport;
