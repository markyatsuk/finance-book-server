const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

global.basedir = __dirname;

const { authRouter, usersRouter, transactionsRouter } = require("./routes/api");

const swaggerDocument = require("./swagger.json");

const app = express();

require("dotenv").config();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/auth", authRouter);

app.use("/api/users", usersRouter);

app.use("/api/transactions", transactionsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found - 404, но ты залогинился! ;)" });
});

app.use((err, _, res, __) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
