const Transaction = require("../models/transactions");

const createTransaction = async (body, owner) => {
    return await Transaction.create({ ...body, owner });
};

const getAllByDate = async (owner, date) => {
    return await Transaction.find({ owner, date });
};

const getAllByPeriod = async (owner, period) => {
    return await Transaction.find({ owner, period });
};

const remove = async (id) => {
    return await Transaction.findByIdAndRemove({ _id: id });
};

const update = async (id, body) => {
    return await Transaction.findByIdAndUpdate({ _id: id }, { ...body });
};

module.exports = {
    createTransaction,
    getAllByDate,
    getAllByPeriod,
    remove,
    update,
};
