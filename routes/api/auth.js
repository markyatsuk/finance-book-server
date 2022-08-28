const express = require("express");

const { basedir } = global;

const  ctrl = require(`${basedir}/controllers/auth`);

const { ctrlWrapper } = require(`${basedir}/helpers`);

const { auth } = require(`${basedir}/middlewares`);

const router = express.Router();

router.post("/register", ctrlWrapper(ctrl.register));

// router.get("/verify", ctrlWrapper(ctrl.verifyEmail));

// router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

// router.post("/verify", ctrlWrapper(ctrl.resendVerifyEmail));

router.post("/login", ctrlWrapper(ctrl.login));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.get('/google', ctrlWrapper(ctrl.googleAuth));

router.get('/google-redirect', ctrlWrapper(ctrl.googleRedirect));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
