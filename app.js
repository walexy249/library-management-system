const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bookRouter = require("./routes/bookRoutes");

dotenv.config({ path: "./config.env" });
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json({ limit: "10kb" }));

app.use("/api/books", bookRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Database connection successful ✅");
  })
  .catch((err) => {
    console.log("Error", err);
  });
