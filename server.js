const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const taskRoutes = require("./routes/task");
const timeTableRoutes = require("./routes/timetable");

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/flights")
  .then(() => {
    mongoose.connection.readyState === 1
      ? console.log("MongoDB connected to 127.0.0.1:27017")
      : console.error("Some problem", mongoose.connection.readyState);
  })
  .catch((err) => {
    console.error("MongoDB connection error", err.message);
  });

const app = express();
app.listen(8000);
app.use(bodyParser.json());
timeTableRoutes(app);
taskRoutes(app);
