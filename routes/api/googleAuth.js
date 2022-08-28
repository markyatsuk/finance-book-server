const express = require("express");
const { basedir } = global;

const  ctrl = require(`${basedir}/controllers/auth`);
const { ctrlWrapper } = require(`${basedir}/helpers`);

const router = express.Router();

router.get("/google", ctrlWrapper(ctrl.googleAuth));

router.get(
  "/google-redirect",
  ctrlWrapper(ctrl.googleRedirect)
);

module.exports = router;
