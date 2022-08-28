const express = require("express");

const { basedir } = global;

const { users: ctrl } = require(`${basedir}/controllers`);

const { ctrlWrapper, validation } = require(`${basedir}/helpers`);

const { auth } = require(`${basedir}/middlewares`);

const { schemaBalanceUser } = require(`${basedir}/models/user`);

const router = express.Router();

router.put(
  "/balance",
  auth,
  validation(schemaBalanceUser),
  ctrlWrapper(ctrl.updateBalance)
);

module.exports = router;
