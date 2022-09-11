const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config("/");

const { basedir } = global;

const { User, schemas } = require(`${basedir}/models/user`);

const { createError } = require(`${basedir}/helpers`);

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
    const { error } = schemas.login.validate(req.body);
    if (error) {
        throw createError(400, error.message);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw createError(401, "Email wrong");
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
        throw createError(401, "Password wrong");
    }
    const payload = {
        id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            token,
            user: {
                email,
                id: user._id,
                balance: user.balance,
                balanceHasBeenSet: user.balanceHasBeenSet,
            },
        },
    });
};

module.exports = login;
