const { Schema, model } = require("mongoose");
const Joi = require("joi");

const transactionSchema = Schema(
  {
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    date: {
      day: String,
      month: String,
      year: String,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    sum: {
      type: Number,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Transaction = model("transaction", transactionSchema);

const joiTransactionCreateSchema = Joi.object({
  type: Joi.string().required(),
  date: Joi.object({
    day: Joi.string().required(),
    month: Joi.string().required(),
    year: Joi.string().required(),
  }),
  category: Joi.string().required(),
  subCategory: Joi.string().required(),
  sum: Joi.number().options({ convert: false }),
  balance: Joi.number(),
});

const joiTransactionUpdateSchema = Joi.object({
  type: Joi.string().optional(),
  date: Joi.string().optional(),
  category: Joi.string().optional(),
  subCategory: Joi.string().optional(),
  balance: Joi.number().optional(),
  sum: Joi.number().optional(),
  owner: Joi.string().optional(),
  updatedAt: Joi.string().optional(),
  createdAt: Joi.string().optional(),
});

module.exports = {
  Transaction,
  joiTransactionCreateSchema,
  joiTransactionUpdateSchema,
};
