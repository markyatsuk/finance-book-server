const getCurrent = async (req, res) => {
  const { email, balance } = req.user;
  res.json({
    email,
    balance,
  });
};

module.exports = getCurrent;
