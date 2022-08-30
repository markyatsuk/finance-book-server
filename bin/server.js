const app = require("../app");
require("colors");

const mongoose = require("mongoose");

const { DB_HOST, PORT } = process.env;

mongoose
    .connect(DB_HOST)
    .then(() =>
        app.listen(PORT, () => {
            console.log(
                `MongoDB connection successful, port: ${PORT}`.yellow.bgBlack
                    .bold,
            );
        }),
    )
    .catch((error) => {
        console.log(
            `Server not running. Error message: ${error.message}`.red.bgBlack
                .bold,
        );
        process.exit(1);
    });
