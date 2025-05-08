const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });
const app = express();

const port = process.env.PORT;
app.listen(port, () => {
  console.log("App running on port 3000");
});
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Database connection successful ✅");
  })
  .catch((err) => {
    console.log("Error", err);
  });
