const { Schema, model } = require("mongoose");
const Joi = require("joi");
const dateRegExp =
  /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

const transactionSchema = Schema(
  {
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    date: {
      type: String,
      required: true,
      match: dateRegExp,
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
    day: {
      type: String,
    },
    month: {
      type: String,
    },
    year: {
      type: String,
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
  date: Joi.string().required(),
  category: Joi.string().required(),
  subCategory: Joi.string().required(),
  balance: Joi.number(),
  sum: Joi.number().required(),
  day: Joi.string().optional(),
  month: Joi.string().optional(),
  year: Joi.string().optional(),
});

const joiTransactionUpdateSchema = Joi.object({
  type: Joi.string().optional(),
  date: Joi.string().optional(),
  category: Joi.string().optional(),
  subCategory: Joi.string().optional(),
  balance: Joi.number(),
  sum: Joi.number().optional(),
  month: Joi.string().optional(),
  year: Joi.string().optional(),
  owner: Joi.string().optional(),
  updatedAt: Joi.string().optional(),
  createdAt: Joi.string().optional(),
});

module.exports = {
  Transaction,
  joiTransactionCreateSchema,
  joiTransactionUpdateSchema,
};
