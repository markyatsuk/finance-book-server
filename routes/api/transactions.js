const express = require("express");

const { basedir } = global;

const { transaction: ctrl } = require(`${basedir}/controllers`);

const { ctrlWrapper, validation } = require(`${basedir}/helpers`);

const { auth } = require(`${basedir}/middlewares`);

const {
  joiTransactionCreateSchema,
  joiTransactionUpdateSchema,
} = require(`${basedir}/models/transaction`);

const router = express.Router();

router.get("/:date", auth, ctrlWrapper(ctrl.getAllTransactionsByDate));

router.post(
  "/",
  auth,
  validation(joiTransactionCreateSchema),
  ctrlWrapper(ctrl.createTransaction)
);

router.put(
  "/:id",
  auth,
  validation(joiTransactionUpdateSchema),
  ctrlWrapper(ctrl.updateTransaction)
);

router.delete("/:id", auth, ctrlWrapper(ctrl.deleteTransaction));

module.exports = router;
