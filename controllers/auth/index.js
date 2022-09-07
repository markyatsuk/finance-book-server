const register = require("./register");
const getCurrent = require("./getCurrent");
const login = require("./login");
const logout = require("./logout");
const googleAuth = require("./googleAuth");
const googleRedirect = require("./googleRedirect");
const balance = require("./balance");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");

module.exports = {
    register,
    login,
    logout,
    balance,
    getCurrent,
    googleAuth,
    googleRedirect,
    verifyEmail,
    resendVerifyEmail,
};
