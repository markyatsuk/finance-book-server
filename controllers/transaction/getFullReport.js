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
    {
      $sort: {
        type: 1,
      },
    },
  ]);

  if (!transactions) {
    throw createError;
  }

  const sortTransactions = transactions.sort((a, b) =>
    a._id.type.localeCompare(b._id.type)
  );

  const sort = sortTransactions.map((item) => {
    const sortReposts = item.reports.sort((a, b) => a._id.localeCompare(b._id));
    return { id: item._id, reports: sortReposts, total: item.total };
  });

  res.json({
    status: "success",
    code: 200,
    transactions: sort,
  });
};

module.exports = getFullReport;
