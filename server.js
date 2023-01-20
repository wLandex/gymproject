const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const TimeTable = require("./classes/timetable.js");
const timeTableCollection = require("./models/timeTableCollection");
const taskCollection = require("./models/taskCollection");

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

async function findTimeTable(filter = {}) {
  try {
    if ((await timeTableCollection.find(filter)).length !== 0) return true;
    return false;
  } catch {
    return false;
  }
}

app.use(bodyParser.json());

app.get("/timetables", async (req, res) => {
  try {
    res.json(await timeTableCollection.find());
  } catch {
    res.sendStatus(204);
  }
});

app.post("/timetables", async (req, res) => {
  if ((await findTimeTable({ name: req.body.name })) || req.body.name === "") {
    res.sendStatus(401);
    return;
  }
  try {
    let result = await timeTableCollection.insertMany([
      { name: req.body.name },
    ]);
    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
});

app.get("/timetables/:ttID", async (req, res) => {
  try {
    let result = await timeTableCollection.find({ _id: req.params.ttID });
    res.json(result);
  } catch {
    res.sendStatus(400);
  }
});

app.get("/timetables/:ttID/tasks", async (req, res) => {
  if (await timeTableCollection.find({ _id: req.params.ttID })) {
    try {
      console.log(req.params.ttID);
      res.send(await taskCollection.find({ timeTableID: req.params.ttID }));
      return;
    } catch {
      res.send(204);
    }
  } else {
    res.send(400);
  }
});

app.post("/timetables/:ttID/tasks", async (req, res) => {
  if (await timeTableCollection.find({ _id: req.params.ttID })) {
    if (req.body.name && req.body.description) {
      await taskCollection.insertMany([
        {
          name: req.body.name,
          description: req.body.description,
          timeTableID: req.params.ttID,
        },
      ]);
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  } else {
    res.send(400);
  }
});
