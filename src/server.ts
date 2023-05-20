import express, {Express} from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const tokenRoutes = require("./infrastructure/routes/api/token");
import taskRoutes from "./infrastructure/routes/api/task";

const timeTableRoutes = require("./infrastructure/routes/api/timetable");
const userRoutes = require("./infrastructure/routes/api/user.js");

const passwordRoutes = require("./infrastructure/routes/api/password.js")


const staticLoginRoutes = require("./infrastructure/routes/static/login")

const dotenv = require("dotenv");
dotenv.config();

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
const router = express.Router();
const staticRouter = express.Router();


app.listen(8000);
app.use(bodyParser.json());
timeTableRoutes(router);
taskRoutes(router);
userRoutes(router);
tokenRoutes(router);
passwordRoutes(router)

staticLoginRoutes(staticRouter)


app.use(staticRouter);
app.use('/api/v1', router);


app.use(function (req, res) {
    res.sendStatus(404);
})


