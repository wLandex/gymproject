const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const tasks = require("./classes/task.js");

const timeTableCollection = require("./models/timeTableCollectionModel");
const taskCollectionModel = require("./models/taskCollectionModel");

const timeTableController = require("./controllers/timeTable.js");

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

app.get("/timetables", timeTableController.getAll);

app.post("/timetables", timeTableController.create);

app.delete("/timetables", timeTableController.delete);

app.get("/timetables/:ttID", timeTableController.getByID);

app.delete("/timetables/:ttID/tasks", timeTableController.deleteTasks);

app.delete("/timetables/:ttID", timeTableController.deleteByID);

app.post("/timetables/:ttID/tasks", timeTableController.createTasks);

app.get("/timetables/:ttID/tasks", timeTableController.getTasks);

app.get("/timetables/:ttID/tasks/:taskID", timeTableController.getTaskByID);

app.delete(
  "/timetables/:ttID/tasks/:taskID",
  timeTableController.deleteTaskByID
);
//FIX
// app.put("/timetables/:ttID/tasks/:taskID", timeTableCollection.changeTaskByID);
