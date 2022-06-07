/* eslint-disable no-console */
require("dotenv").config();
const mongoose = require("mongoose");

const {MONGODB_URI} = process.env;

const initializeDatabaseConnection = () => {
  mongoose.connect(MONGODB_URI.toString(), {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  const database = mongoose.connection;

  database.on("error", (error) => {
    console.log(error);
  });

  database.once("connected", () => {
    console.log("Database Connected");
  });
};

module.exports = initializeDatabaseConnection;
