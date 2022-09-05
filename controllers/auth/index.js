const register = require("./register");
const getCurrent = require("./getCurrent");
const login = require("./login");
const logout = require("./logout");
const googleAuth = require("./googleAuth");
const googleRedirect = require("./googleRedirect");

module.exports = {
    register,
    login,
    logout,
    getCurrent,
    googleAuth,
    googleRedirect,
};
