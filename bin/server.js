const app = require("../app");
require("colors");

const mongoose = require("mongoose");

const { DB_HOST, PORT } = process.env;

mongoose
    .connect(DB_HOST)
    .then(
        () => console.log(`MongoDB connection successful, port ${PORT}`),
        app.listen(PORT),
    )
    .catch((error) => {
        console.log(error.message);
        process.exit(1);
    });
