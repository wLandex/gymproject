const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const tasks = require("./classes/taskCollection.js");

const timeTableCollection = require("./models/timeTableCollectionModel");
const taskCollectionModel = require("./models/taskCollectionModel");
const { send } = require("process");

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

app.get("/timetables", async (req, res) => {
  try {
    res.json(await timeTableCollection.find());
  } catch {
    res.sendStatus(204);
  }
});

app.delete("/timetables", async (req, res) => {
  try {
    if (await timeTableCollection.find()) {
      await timeTableCollection.deleteMany({});
      await tasks.removeTasks({});
      res.send(200);
      return;
    }
    res.send(204);
    return;
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

app.get("/timetables/:ttID", async (req, res) => {
  try {
    let result = await timeTableCollection.find({ _id: req.params.ttID });
    res.json(result);
  } catch {
    res.sendStatus(400);
  }
});

app.delete("/timetables/:ttID", async (req, res) => {
  try {
    await timeTableCollection.deleteMany({ _id: req.params.ttID });
    await tasks.removeTasks({ timeTableID: req.params.ttID });
    res.send(200);
  } catch {
    res.sendStatus(400);
  }
});

app.get("/timetables/:ttID/tasks", async (req, res) => {
  if (await timeTableCollection.find({ _id: req.params.ttID })) {
    try {
      console.log(req.params.ttID);
      res.send(await tasks.getTasks({ timeTableID: req.params.ttID }));
      return;
    } catch {
      res.send(204);
    }
  } else {
    res.send(400);
  }
});

app.delete("/timetables/:ttID/tasks", async (req, res) => {
  if (await timeTableCollection.find({ _id: req.params.ttID })) {
    try {
      await tasks.removeTasks({ timeTableID: req.params.ttID });
      res.sendStatus(200);
    } catch {
      res.send(500);
    }
  } else {
    res.send(400);
  }
});

app.post("/timetables/:ttID/tasks", async (req, res) => {
  if (await timeTableCollection.find({ _id: req.params.ttID })) {
    if (req.body.name && req.body.description) {
      await tasks.addTask({
        name: req.body.name,
        description: req.body.description,
        timeTableID: req.params.ttID,
      });
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  } else {
    res.send(400);
  }
});

app.get("/timetables/:ttID/tasks/:taskID", async (req, res) => {
  if (await timeTableCollection.find({ _id: req.params.ttID })) {
    try {
      res.json(await tasks.getTaskByID(req.params.taskID));
    } catch {
      res.sendStatus(400);
    }
  } else {
    res.send(400);
  }
});

app.delete("/timetables/:ttID/tasks/:taskID", async (req, res) => {
  if (await timeTableCollection.find({ _id: req.params.ttID })) {
    await tasks.removeTaskByID(req.params.taskID);
    res.sendStatus(200);
  } else {
    res.send(400);
  }
});

app.put("/timetables/:ttID/tasks/:taskID", async (req, res) => {
  if (
    (await timeTableCollection.find({ _id: req.params.ttID })) &&
    (await tasks.getTasks({ _id: req.params.taskID })).length > 0
  ) {
    await tasks.changeTask(req.params.taskID, {
      name: req.body.name,
      description: req.body.description,
    });

    res.sendStatus(200);
  } else {
    res.send(400);
  }
});
