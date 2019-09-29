const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const chalk = require("chalk");
const router = require("./router");

require("dotenv").config();

const app = express();

require("./services/dbService")();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use("/", router);
// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () =>
  console.log(`${chalk.blue("Compare Tables")} is listening on port: ${PORT}`),
);
