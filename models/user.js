const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegexp =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

// const emailRegexp = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

const userSchema = Schema(
    {
        // name: {
        //     type: String,
        //     required: true,
        // },
        email: {
            type: String,
            minlength: 10,
            maxlength: 63,
            match: emailRegexp,
            required: [true, "Email is required"],
            unique: true,
        },
        password: {
            type: String,
            minlength: 6,
        //    required: false,
        },
        token: {
            type: String,
            default: null,
        },
        verify: {
            type: Boolean,
            default: false,
        },
        balance: {
            type: Number,
            default: 0,
        },
    },
    { versionKey: false, timestamps: true },
);

const registerSchema = Joi.object({
    // name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const schemaBalanceUser = Joi.object({
    balance: Joi.number(),
});

const schemas = {
    register: registerSchema,
    login: loginSchema,
};

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
    schemaBalanceUser,
};
