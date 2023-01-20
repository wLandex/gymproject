const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const DB = require("./classes/db.js");
const TimeTable = require("./classes/timetable.js");

const timeTableDb = new DB();

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

let timetable = new TimeTable("Anya", timeTableDb);

// const id1 = ann.addTask({ name: "Занятие в зале", description: "3 по 15" });
// const id2 = ann.addTask({ name: "Занятие на улице", description: "Бег" });
// const id3 = ann.addTask({ name: "Занятие в зале", description: "12 sdf" });

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("You on root path");
});

app.get("/timetable/tasks", async (req, res) => {
  res.json(await timetable.getTasks());
});

app.listen(8000, () => {
  console.log("listened on 8000");
});

app.post("/timetable/tasks", async (req, res) => {
  try {
    await timetable.addTask({
      name: req.body.name,
      description: req.body.description,
    });
    res.send();
  } catch (err) {
    res.status(400);
    res.json({ errorMessage: err.message });
  }
});

app.put("/timetable/tasks/:id", async (req, res) => {
  let id = req.params.id;
  console.log(req.params.id);
  let result = await timetable.changeTask(id, req.body);
  res.json(result);
  // console.log(req.body);
  // res.send(req.body);
});

app.delete("/timetable/tasks/:id", async (req, res) => {
  await timetable.removeTaskByID(req.params.id);
  res.sendStatus(200);
});

// app.get("*", (req, res) => {
//   res.status(404).json({ path: "invalid path in get" });
// });

app.get("/timetable/tasks/:id", async (req, res) => {
  const task = await timetable.getTaskByID(req.params.id);
  res.json(task);
});

app.use((req, res) => {
  res.status(404).json({ path: "invalid path" });
});
