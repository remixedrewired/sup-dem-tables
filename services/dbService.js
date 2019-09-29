const mongoose = require("mongoose");
const chalk = require("chalk");

const connected = chalk.bold.green;
const disconnected = chalk.bold.yellow;
const error = chalk.bold.red;
const termination = chalk.bold.pink;

module.exports = () => {
  mongoose.connect(process.env.DATABASE_URL, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
  });

  mongoose.connection
    .on("connected", () => console.log(connected(`MongoDB connection is open`)))
    .on("error", (e) =>
      console.log(error(`MongoDB connection has occurred error: ${e}`)),
    )
    .on("disconnected", () =>
      console.log(disconnected(`MongoDB connection is disconnected`)),
    );

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log(
        termination(
          `MongoDB connection is disconnected due to application termination`,
        ),
      );
      process.exit(0);
    });
  });
};
