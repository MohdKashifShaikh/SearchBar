const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
const routing = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(logger("dev"));

const PORT = 5000 || process.env.PORT;

app.use(cors());
app.use("/", routing);

mongoose
  .connect("mongodb://localhost:27017/Search")
  .then(() => {
    console.log("Database Connected Successfully!");
  })
  .catch((err) => {
    console.log("Error in connecting to Database", err.toString());
  });

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error in starting SERVER !");
  } else {
    console.log("SERVER Started on Port : ", PORT);
  }
});
