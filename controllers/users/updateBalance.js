const { basedir } = global;

const { User } = require(`${basedir}/models/user`);

const { createError } = require(`${basedir}/helpers`);

const updateBalance = async (req, res) => {
  const userId = req.user.id;
  const userBalance = req.body.balance;
  const result = await User.findOneAndUpdate(
    { _id: userId },
    { balance: userBalance },
    { new: true }
  );

  if (!result) {
    throw createError(404);
  }

  res.json({
    status: "success",
    data: { balance: result.balance },
  });
};

module.exports = updateBalance;
