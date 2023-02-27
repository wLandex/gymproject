import express, {Express} from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const tokenRoutes = require("./infrastructure/routes/token");
import taskRoutes from "./infrastructure/routes/task"

const timeTableRoutes = require("./infrastructure/routes/timetable");
const userRoutes = require("./infrastructure/routes/user.js");

mongoose.set("strictQuery", false);
mongoose
    .connect("mongodb://127.0.0.1:27017/flights")
    .then(() => {
        mongoose.connection.readyState === 1
            ? console.log("MongoDB connected to 127.0.0.1:27017")
            : console.error("Some problem", mongoose.connection.readyState);
    })
    .catch((err: Error) => {
        console.error("MongoDB connection error", err.message);
    });

const app: Express = express();
app.listen(8000);
app.use(bodyParser.json());
timeTableRoutes(app);
taskRoutes(app);
userRoutes(app);
tokenRoutes(app);