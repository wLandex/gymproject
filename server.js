const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const tasks = require("./classes/task.js");

const timeTableCollection = require("./models/timeTableCollectionModel");
const taskCollectionModel = require("./models/taskCollectionModel");

const timeTableContoller = require("./controllers/timeTable.js");

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

app.get("/timetables", timeTableContoller.getAll);

app.delete("/timetables", timeTableContoller.create);

app.get("/timetables/:ttID", timeTableContoller.getByID);

app.delete("/timetables/:ttID", timeTableContoller.deleteByID);

app.get("/timetables/:ttID/tasks", timeTableContoller.getTasks);

app.delete("/timetables/:ttID/tasks", timeTableContoller.deleteTasks);

app.post("/timetables/:ttID/tasks", timeTableContoller.createTasks);

app.get("/timetables/:ttID/tasks/:taskID", timeTableContoller.getTaskByID);

app.delete(
  "/timetables/:ttID/tasks/:taskID",
  timeTableContoller.deleteTaskByID
);

app.put("/timetables/:ttID/tasks/:taskID", timeTableCollection.changeTaskByID);
