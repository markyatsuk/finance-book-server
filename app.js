const express = require("express");
const logger = require("morgan");
const cors = require("cors");

global.basedir = __dirname;

const { authRouter } = require("./routes/api/");

const transactionRouter = require("./routes/api/transaction");

const userRouter = require("./routes/api/users");

const app = express();

require("dotenv").config();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);

// app.use("/api/googleAuth/", googleRouter);

app.use("/api/transaction", transactionRouter);

app.use("/api/user", userRouter);

// app.use((req, res) => {
//   res.status(404).json({ message: "Not found почему-то" });
// });

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
