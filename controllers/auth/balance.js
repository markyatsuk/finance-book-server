const Users = require("../../repositories/users");
require("dotenv").config();
require("../../helpers");

const updateBalance = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const userBalance = req.body.balance;
        const result = await Users.createBalance(userId, userBalance);
        if (result) {
            return res.status(201).json({
                status: "success",
                code: 201,
                data: { balance: result.balance },
            });
        }
        return res
            .status(404)
            .json({ status: "error", code: 404, message: "Not found" });
    } catch (error) {
        next(error);
    }
};

module.exports = updateBalance;
